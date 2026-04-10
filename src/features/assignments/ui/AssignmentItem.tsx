import { Card } from "@/shared/ui/Card"
import { StatusBadge } from "@/shared/ui/StatusBadge"
import { Calendar, Clock } from "lucide-react"
import type { IAssignment } from "@/entities/assignments/api/assignments.api.type"

export function AssignmentItem({ assignment, onClick }: { assignment: IAssignment; onClick: () => void }) {
    const isPast = new Date(assignment.due_date) < new Date()

    return (
        <Card
            hoverable
            onClick={onClick}
            className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-text-secondary bg-gray-100 px-2 py-1 rounded-md">
                        {assignment.class?.name ?? "-"}
                    </span>
                    <StatusBadge status={assignment.my_status ?? "not_submitted"} />
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-1">{assignment.title}</h3>
                <p className="text-sm text-text-secondary line-clamp-1">{assignment.description}</p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-6 min-w-35">
                <div
                    className={`flex items-center gap-1.5 text-sm font-medium ${
                        isPast && assignment.my_status === "not_submitted" ? "text-accent" : "text-text-secondary"
                    }`}
                >
                    <Calendar size={16} />
                    {new Date(assignment.due_date).toLocaleDateString("ko-KR")}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(assignment.due_date).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                    마감
                </div>
            </div>
        </Card>
    )
}
