import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(1, "아이디를 입력해주세요."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
})

export const signupSchema = z.object({
    username: z.string().min(1, "아이디를 입력해주세요."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    name: z.string().min(1, "이름을 입력해주세요."),
    school: z.string().min(1, "학교명을 입력해주세요."),
    student_number: z.string().min(1, "학번을 입력해주세요."),
})

export type loginFormData = z.infer<typeof loginSchema>
export type signupFormData = z.infer<typeof signupSchema>
