import { Card } from "@/shared/ui/Card"
import { StatusBadge } from "@/shared/ui/StatusBadge"
import { Clock, ChevronRight, AlertCircle, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { IAssignment } from "@/entities/assignments/api/assignments.api.type"

export function DueAssignmentsSection({ assignments }: { assignments: IAssignment[] }) {
    const navigate = useNavigate()

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Clock className="text-accent" size={20} />
                    미제출 과제
                </h2>
                <button
                    onClick={() => navigate("/assignments")}
                    className="text-sm text-text-secondary hover:text-primary flex items-center"
                >
                    전체보기 <ChevronRight size={16} />
                </button>
            </div>

            {assignments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {assignments.map((assignment) => (
                        <Card
                            key={assignment.id}
                            hoverable
                            onClick={() => navigate(`/assignments/${assignment.id}`)}
                            className="p-5 border-l-4 border-l-accent"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium text-text-secondary bg-gray-100 px-2 py-1 rounded-md">
                                    {assignment.class?.name ?? "-"}
                                </span>
                                <StatusBadge status={assignment.my_status ?? "not_submitted"} />
                            </div>
                            <h3 className="font-bold text-text-primary mb-2 line-clamp-1">{assignment.title}</h3>
                            <p className="text-sm text-text-secondary mb-4 line-clamp-2">{assignment.description}</p>
                            <div className="text-xs font-medium text-accent flex items-center gap-1">
                                <AlertCircle size={14} />
                                마감일: {new Date(assignment.due_date).toLocaleDateString("ko-KR")}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-8 text-center text-text-secondary flex flex-col items-center justify-center">
                    <CheckCircle size={32} className="text-success mb-2" />
                    <p>미제출 과제가 없습니다!</p>
                </Card>
            )}
        </section>
    )
}
