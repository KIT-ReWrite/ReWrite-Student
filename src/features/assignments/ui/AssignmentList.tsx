import { motion } from "framer-motion"
import { AssignmentItem } from "./AssignmentItem"
import type { IAssignment } from "@/entities/assignments/api/assignments.api.type"

export function AssignmentList({
    assignments,
    onClick,
}: {
    assignments: IAssignment[]
    onClick: (id: number) => void
}) {
    if (assignments.length === 0) {
        return (
            <div className="text-center py-20 text-text-secondary bg-white rounded-2xl border border-dashed border-gray-200">
                해당하는 과제가 없습니다.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {assignments.map((assignment, index) => (
                <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <AssignmentItem assignment={assignment} onClick={() => onClick(assignment.id)} />
                </motion.div>
            ))}
        </div>
    )
}
