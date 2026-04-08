import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Users, BookOpen, Plus, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { mockClasses } from "@/shared/model/mockData"
import { Card } from "@/shared/ui/Card"
import { PageLayout } from "@/shared/ui/PageLayout"

function ClassesPage() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inviteCode, setInviteCode] = useState("")
    const handleJoinClass = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock join action
        alert(`초대 코드 ${inviteCode}로 학급에 참가했습니다.`)
        setIsModalOpen(false)
        setInviteCode("")
    }
    return (
        <PageLayout
            title="내 학급"
            description="참여 중인 학급 목록입니다."
            action={
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    학급 참가하기
                </button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockClasses.map((cls, index) => (
                    <motion.div
                        key={cls.id}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: index * 0.1,
                        }}
                    >
                        <Card hoverable onClick={() => navigate(`/classes/${cls.id}`)} className="h-full flex flex-col">
                            <div className="h-24 bg-linear-to-r from-primary-light to-secondary-light p-5 flex items-end">
                                <h3 className="text-xl font-bold text-text-primary">{cls.name}</h3>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                                            {cls.teacher_name.charAt(0)}
                                        </div>
                                        {cls.teacher_name} 선생님
                                    </div>
                                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                                        <Users size={16} />
                                        학생 {cls.student_count}명
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-sm font-medium text-primary flex items-center gap-1">
                                        <BookOpen size={16} />
                                        과제 보기
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Join Class Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                            }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-5 border-b border-gray-100">
                                <h3 className="text-lg font-bold">학급 참가하기</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleJoinClass} className="p-5">
                                <p className="text-sm text-text-secondary mb-4">
                                    선생님께 받은 6자리 학급 초대 코드를 입력해주세요.
                                </p>
                                <input
                                    type="text"
                                    placeholder="초대 코드 입력 (예: KOR204)"
                                    className="notion-input text-center text-lg tracking-widest uppercase mb-6"
                                    value={inviteCode}
                                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                    maxLength={8}
                                    required
                                />
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-text-secondary font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={inviteCode.length < 4}
                                        className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        참가하기
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageLayout>
    )
}

export default ClassesPage
