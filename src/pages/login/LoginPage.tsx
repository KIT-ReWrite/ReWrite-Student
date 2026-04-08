import AuthForm from "@/features/auth/ui/AuthForm"
/**
 * @description 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 py-12">
            <AuthForm type="login" />
        </div>
    )
}

export default LoginPage
