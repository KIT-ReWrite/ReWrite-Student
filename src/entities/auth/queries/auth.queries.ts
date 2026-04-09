import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { authApi, userApi } from "@/entities/auth/api/auth.api"
import type { IStudentSignupRequest, ILoginRequest, IUpdateUserRequest } from "@/entities/auth/api/auth.api.type"

export const AUTH_KEYS = {
    me: ["me"] as const,
}

/** 학생 회원가입 */
export const useStudentSignupMutation = () =>
    useMutation({
        mutationFn: (params: IStudentSignupRequest) => authApi.studentSignup(params),
        onSuccess: () => toast.success("회원가입이 완료되었습니다."),
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "회원가입에 실패했습니다."),
    })

/** 로그인 */
export const useLoginMutation = () =>
    useMutation({
        mutationFn: (params: ILoginRequest) => authApi.login(params),
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "로그인에 실패했습니다."),
    })

/** 로그아웃 */
export const useLogoutMutation = () =>
    useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => toast.success("로그아웃 되었습니다."),
        onError: () => toast.error("로그아웃에 실패했습니다."),
    })

/** 내 정보 조회 */
export const useMeQuery = () =>
    useQuery({
        queryKey: AUTH_KEYS.me,
        queryFn: () => userApi.getMe(),
        staleTime: 1000 * 60 * 5,
    })

/** 내 정보 수정 */
export const useUpdateMeMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: IUpdateUserRequest) => userApi.updateMe(params),
        onSuccess: (data) => {
            queryClient.setQueryData(AUTH_KEYS.me, data)
            toast.success("정보가 수정되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "수정에 실패했습니다."),
    })
}

/** 프로필 이미지 변경 */
export const useUpdateProfileImageMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (file: File) => userApi.updateProfileImage(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me })
            toast.success("프로필 이미지가 변경되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "이미지 변경에 실패했습니다."),
    })
}
