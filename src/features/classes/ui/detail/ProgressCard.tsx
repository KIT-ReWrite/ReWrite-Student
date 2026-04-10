import { Card } from "@/shared/ui/Card"
import { motion } from "framer-motion"
import type { IClassAssignment } from "@/entities/classes/api/classes.api.type"

export function ProgressCard({ assignments }: { assignments: IClassAssignment[] }) {
    const completedCount = assignments.filter((a) => a.my_status && a.my_status !== "not_submitted").length
    const totalCount = assignments.length
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

    return (
        <Card className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-bold text-text-primary">나의 진행률</h2>
                <span className="text-sm text-text-secondary">
                    {completedCount}/{totalCount} 과제 완료
                </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
            <div className="text-right mt-2 text-sm font-bold text-primary">{progressPercent}%</div>
        </Card>
    )
}
