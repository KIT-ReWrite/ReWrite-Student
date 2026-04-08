import { Card } from "@/shared/ui/Card"
import { motion } from "framer-motion"
import { Users, BookOpen } from "lucide-react"
import { useNavigate } from "react-router"

export function ClassCard({ cls, index }: any) {
    const navigate = useNavigate()

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
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
    )
}
