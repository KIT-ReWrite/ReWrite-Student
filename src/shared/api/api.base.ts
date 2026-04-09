import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

// 재시도 여부를 추적하기 위한 커스텀 필드
interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

/** 토큰 갱신 중 대기 중인 요청들을 처리하는 큐 */
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (token) resolve(token)
        else reject(error)
    })
    failedQueue = []
}

const clearAuthAndRedirect = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")

    const authPaths = ["/login", "/signup"]
    const isAuthPage = authPaths.some((path) => window.location.pathname.startsWith(path))
    if (!isAuthPage) {
        window.location.href = "/login"
    }
}

/** 요청 인터셉터 - 토큰 자동 주입 */
apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken")
        const isAuthEndpoint =
            config.url?.includes("/auth/login") ||
            config.url?.includes("/auth/register") ||
            config.url?.includes("/auth/refresh")

        if (token && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

/** 응답 인터셉터 - 401 시 refresh 후 재시도 */
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryAxiosRequestConfig

        // refresh 요청 자체가 401이면 즉시 로그아웃
        if (originalRequest.url?.includes("/auth/refresh")) {
            clearAuthAndRedirect()
            return Promise.reject(error)
        }

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error)
        }

        // 이미 refresh 중이면 큐에 적재 후 대기
        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject })
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return apiInstance(originalRequest)
                })
                .catch((err) => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
            clearAuthAndRedirect()
            return Promise.reject(error)
        }

        try {
            const { data } = await apiInstance.post<{
                access_token: string
                refresh_token: string
            }>("/auth/refresh", { refresh_token: refreshToken })

            localStorage.setItem("accessToken", data.access_token)
            localStorage.setItem("refreshToken", data.refresh_token)

            apiInstance.defaults.headers.common.Authorization = `Bearer ${data.access_token}`
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`

            processQueue(null, data.access_token)
            return apiInstance(originalRequest)
        } catch (refreshError) {
            processQueue(refreshError, null)
            clearAuthAndRedirect()
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    }
)

export const ApiHelper = {
    get: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.get(url, config)
        return response.data
    },

    post: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.post(url, data, config)
        return response.data
    },

    patch: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.patch(url, data, config)
        return response.data
    },

    put: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.put(url, data, config)
        return response.data
    },

    delete: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.delete(url, config)
        return response.data
    },

    postForm: async <T = unknown>(url: string, data: FormData): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.post(url, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return response.data
    },

    patchForm: async <T = unknown>(url: string, data: FormData): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.patch(url, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return response.data
    },
}
