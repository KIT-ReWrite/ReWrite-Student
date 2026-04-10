import type { IStoredUser } from "@/entities/auth/api/auth.api.type"

/** 로컬스토리지에서 유저 정보 꺼내기 */
export const getStoredUser = (): IStoredUser | null => {
    try {
        const raw = localStorage.getItem("user")
        if (!raw) return null
        return JSON.parse(raw) as IStoredUser
    } catch {
        return null
    }
}

/** 교사 여부 확인 */
export const isTeacher = (): boolean => {
    return getStoredUser()?.role === "teacher"
}

/** 학생 여부 확인 */
export const isStudent = (): boolean => {
    return getStoredUser()?.role === "student"
}

/** 로그인 여부 확인 */
export const isLoggedIn = (): boolean => {
    return !!localStorage.getItem("accessToken")
}
