import { Card } from "@/shared/ui/Card"
import { StatusBadge } from "@/shared/ui/StatusBadge"
import { motion } from "framer-motion"
import { Calendar, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"

export function AssignmentItem({ assignment, index }: any) {
    const navigate = useNavigate()

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card
                hoverable
                onClick={() => navigate(`/assignments/${assignment.id}`)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <StatusBadge status={assignment.status} />
                    </div>

                    <h3 className="text-lg font-bold text-text-primary mb-1">{assignment.title}</h3>

                    <p className="text-sm text-text-secondary line-clamp-1">{assignment.description}</p>
                </div>

                <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-6">
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                        <Calendar size={16} />
                        {new Date(assignment.due_date).toLocaleDateString("ko-KR")}
                    </div>

                    <ChevronRight size={18} className="text-gray-400" />
                </div>
            </Card>
        </motion.div>
    )
}
