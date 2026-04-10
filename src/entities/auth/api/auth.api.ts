import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type {
    IStudentSignupRequest,
    ISignupResponse,
    ILoginRequest,
    ILoginResponse,
    IUserResponse,
    IUpdateUserRequest,
} from "@/entities/auth/api/auth.api.type"

export const authApi = {
    studentSignup: async (body: IStudentSignupRequest) => ApiHelper.post<ISignupResponse>(API_PATH.AUTH.SIGNUP, body),

    login: async (body: ILoginRequest) => ApiHelper.post<ILoginResponse>(API_PATH.AUTH.LOGIN, body),

    logout: async () => ApiHelper.post(API_PATH.AUTH.LOGOUT),
}

export const userApi = {
    getMe: async () => ApiHelper.get<IUserResponse>(API_PATH.USER.ME),
    updateMe: async (body: IUpdateUserRequest) => ApiHelper.patch<IUserResponse>(API_PATH.USER.ME, body),
    updateProfileImage: async (file: File) => {
        const formData = new FormData()
        formData.append("image", file)
        return ApiHelper.patchForm<{ image_url: string }>(API_PATH.USER.PROFILE_IMAGE, formData)
    },
    getUserById: async (id: string) => ApiHelper.get<IUserResponse>(API_PATH.USER.BY_ID(id)),
}
