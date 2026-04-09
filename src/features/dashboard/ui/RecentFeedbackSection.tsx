import { Card } from "@/shared/ui/Card"
import { StatusBadge } from "@/shared/ui/StatusBadge"
import { TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { IAssignment } from "@/entities/assignments/api/assignments.api.type"

export function RecentFeedbackSection({ assignments }: { assignments: IAssignment[] }) {
    const navigate = useNavigate()

    if (assignments.length === 0) {
        return (
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp className="text-primary" size={20} />
                        최근 받은 피드백
                    </h2>
                </div>
                <Card className="p-8 text-center text-text-secondary">아직 받은 피드백이 없습니다.</Card>
            </section>
        )
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <TrendingUp className="text-primary" size={20} />
                    최근 받은 피드백
                </h2>
            </div>
            <div className="space-y-4">
                {assignments.map((assignment) => (
                    <Card
                        key={assignment.id}
                        hoverable
                        onClick={() => navigate(`/assignments/${assignment.id}`)}
                        className="p-5"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="text-xs font-medium text-text-secondary mb-1 block">
                                    {assignment.class?.name ?? "-"}
                                </span>
                                <h3 className="font-bold text-text-primary">{assignment.title}</h3>
                            </div>
                            <StatusBadge status={assignment.my_status ?? "not_submitted"} />
                        </div>
                        <div className="bg-primary-light/30 p-3 rounded-xl border border-primary-light">
                            <p className="text-sm text-text-secondary text-center">
                                과제를 클릭해서 피드백을 확인하세요.
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}
