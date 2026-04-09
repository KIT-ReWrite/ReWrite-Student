import { Link } from "react-router"
import { motion } from "framer-motion"
import { BookOpen, Mail, Lock, User, Building, EyeOff, Eye } from "lucide-react"
import useLogin from "@/features/auth/hooks/useLogin"
import useSignup from "@/features/auth/hooks/useSignup"

interface IAuthProp {
    type: "login" | "signup"
}

/**
 * @description 로그인/회원가입 폼 컴포넌트
 */
const AuthForm = ({ type }: IAuthProp) => {
    const login = useLogin()
    const signup = useSignup()

    const isLogin = type === "login"

    const isPending = isLogin ? login.isPending : signup.isPending
    const isFormValid = isLogin ? login.isFormValid : signup.isFormValid
    const showPassword = isLogin ? login.showPassword : signup.showPassword
    const handleTogglePassword = isLogin ? login.handleTogglePassword : signup.handleTogglePassword

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.95,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            className="bg-white w-full max-w-md rounded-2xl shadow-card p-8 border border-border"
        >
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center mb-4">
                    <BookOpen className="stroke-primary" size={28} />
                </div>
                <h1 className="text-2xl font-bold text-text-primary">Re:Write</h1>
                <p className="text-text-secondary mt-2">{type == "login" ? "로그인" : "회원가입"}</p>
            </div>

            <form onSubmit={isLogin ? login.handleLoginSubmit : signup.handleSignupSubmit} className="space-y-4">
                {type == "signup" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">이름</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="notion-input pl-10"
                                    placeholder="이름을 입력하세요"
                                    required
                                    {...signup.register("name")}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">학교명</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Building className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="notion-input pl-10"
                                    placeholder="학교명을 입력하세요"
                                    {...signup.register("school")}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">학번</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="notion-input p-4"
                                    placeholder="학번을 입력하세요"
                                    {...signup.register("student_number")}
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">아이디</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="notion-input pl-10"
                            placeholder="아이디를 입력하세요"
                            {...(isLogin ? login.register("username") : signup.register("username"))}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">비밀번호</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="notion-input pl-10 pr-10"
                            placeholder="비밀번호를 입력하세요"
                            {...(isLogin ? login.register("password") : signup.register("password"))}
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (isLogin ? "로그인 중..." : "가입 중...") : isLogin ? "로그인" : "회원가입"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-text-secondary">
                {type == "login" ? "계정이 없으신가요? " : "계정이 있으신가요? "}
                <Link to={type == "login" ? "/signup" : "/login"} className="text-primary font-medium hover:underline">
                    {type == "login" ? "회원가입" : "로그인"}
                </Link>
            </div>
        </motion.div>
    )
}

export default AuthForm
