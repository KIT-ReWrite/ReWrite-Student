import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"

export function JoinClassModal({ isOpen, onClose }: any) {
    const [inviteCode, setInviteCode] = useState("")

    const handleJoinClass = (e: React.FormEvent) => {
        e.preventDefault()
        alert(`초대 코드 ${inviteCode}로 학급에 참가했습니다.`)
        onClose()
        setInviteCode("")
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                >
                    <div className="flex justify-between items-center p-5 border-b border-gray-100">
                        <h3 className="text-lg font-bold">학급 참가하기</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleJoinClass} className="p-5">
                        <p className="text-sm text-text-secondary mb-4">
                            선생님께 받은 6자리 학급 초대 코드를 입력해주세요.
                        </p>

                        <input
                            type="text"
                            className="notion-input text-center text-lg tracking-widest uppercase mb-6"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                        />

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-text-secondary"
                            >
                                취소
                            </button>

                            <button
                                type="submit"
                                disabled={inviteCode.length < 4}
                                className="flex-1 py-2.5 rounded-xl bg-primary text-white"
                            >
                                참가하기
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
