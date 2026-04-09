import { useMemo, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"
import { loginSchema, type loginFormData } from "@/features/auth/model/auth.schema"
import { useLoginMutation } from "@/entities/auth/queries/auth.queries"
import type { IStoredUser } from "@/entities/auth/api/auth.api.type"

const useLogin = () => {
    const navigate = useNavigate()
    const { mutateAsync, isPending } = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isValid, touchedFields },
        setError,
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: { username: "", password: "" },
    })

    const onSubmit: SubmitHandler<loginFormData> = async (data) => {
        if (isPending) return

        try {
            const response = await mutateAsync(data)

            if (response.user.role !== "student") {
                setError("root.loginError", {
                    type: "server",
                    message: "학생 계정으로 로그인해주세요.",
                })
                return
            }

            localStorage.setItem("accessToken", response.access_token)
            localStorage.setItem("refreshToken", response.refresh_token)
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: response.user.id,
                    username: response.user.username,
                    name: response.user.name,
                    role: response.user.role,
                    profile_image: response.user.profile_image,
                } satisfies IStoredUser)
            )
            navigate("/dashboard")
        } catch (error) {
            let errorMessage = "로그인에 실패했습니다. 다시 시도해주세요."

            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다."
                } else {
                    errorMessage = error.response?.data?.message ?? errorMessage
                }
            }

            setError("root.loginError", { type: "server", message: errorMessage })
        }
    }

    const isFormValid = useMemo(() => isValid && !isPending, [isValid, isPending])

    return {
        register,
        handleLoginSubmit: handleFormSubmit(onSubmit),
        errors,
        isFormValid,
        touchedFields,
        isPending,
        showPassword,
        handleTogglePassword: () => setShowPassword((prev) => !prev),
    }
}

export default useLogin
