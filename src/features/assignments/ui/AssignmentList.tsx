import { motion } from "framer-motion"
import { AssignmentItem } from "./AssignmentItem"

export function AssignmentList({ assignments, onClick }: any) {
    if (assignments.length === 0) {
        return (
            <div className="text-center py-20 text-text-secondary bg-white rounded-2xl border border-dashed border-gray-200">
                해당하는 과제가 없습니다.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {assignments.map((assignment: any, index: number) => (
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
