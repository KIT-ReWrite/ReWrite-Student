import { Link, useNavigate } from "react-router"
import { motion } from "framer-motion"
import { BookOpen, Mail, Lock, User, Building } from "lucide-react"
import { useState } from "react"

interface IAuthProp {
    type: "login" | "signup"
}

/**
 * @description 로그인/회원가입 폼 컴포넌트
 */
const AuthForm = ({ type }: IAuthProp) => {
    const navigate = useNavigate()

    const [username, setUserName] = useState("")
    const [school, setSchool] = useState("")
    const [studentNumber, setStudentNumber] = useState("")
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        navigate("/dashboard")
    }

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault()
        navigate("/login")
    }

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

            <form onSubmit={type == "login" ? handleLogin : handleSignup} className="space-y-4">
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
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
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
                                    value={school}
                                    onChange={(e) => setSchool(e.target.value)}
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
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
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
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
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
                            type="password"
                            className="notion-input pl-10"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors mt-6"
                >
                    {type == "login" ? "로그인" : "회원가입"}
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
