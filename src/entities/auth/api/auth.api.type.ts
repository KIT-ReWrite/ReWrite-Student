/** 학생 회원가입 요청 타입 */
export interface IStudentSignupRequest {
    role: "student"
    username: string
    password: string
    name: string
    school: string
    student_number: string
}

/** 회원가입 응답 타입 */
export interface ISignupResponse {
    id: string
    username: string
    role: "teacher" | "student"
}

/** 로그인 요청 타입 */
export interface ILoginRequest {
    username: string
    password: string
}

/** 로그인 응답 타입 (백엔드 기준) */
export interface ILoginResponse {
    access_token: string
    refresh_token: string
    user: {
        id: string
        username: string
        name: string
        role: "teacher" | "student"
        profile_image: string
    }
}

/** 로컬스토리지에 저장할 유저 정보 */
export interface IStoredUser {
    id: string
    username: string
    name: string // ✅ 추가
    role: "teacher" | "student"
    profile_image?: string
}

/** 내 정보 응답 타입 */
export interface IUserResponse {
    id: string
    role: "teacher" | "student"
    username: string
    name: string
    school: string
    subject?: string
    student_number?: string
    profile_image: string
    created_at: string
}

/** 내 정보 수정 요청 타입 */
export interface IUpdateUserRequest {
    name?: string
    school?: string
    subject?: string
    student_number?: string
}
