import { Card } from "@/shared/ui/Card"
import { StatusBadge } from "@/shared/ui/StatusBadge"
import { TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function RecentFeedbackSection({ submissions, assignments }: any) {
    const navigate = useNavigate()

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <TrendingUp className="text-primary" size={20} />
                    최근 받은 피드백
                </h2>
            </div>

            <div className="space-y-4">
                {submissions.map((submission: any) => {
                    const assignment = assignments.find((a: any) => a.id === submission.assignment_id)

                    return (
                        <Card
                            key={submission.id}
                            hoverable
                            onClick={() => navigate(`/submissions/${submission.id}`)}
                            className="p-5"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-xs font-medium text-text-secondary mb-1 block">
                                        {assignment?.class_name}
                                    </span>
                                    <h3 className="font-bold text-text-primary">{assignment?.title}</h3>
                                </div>

                                <StatusBadge status={submission.status} />
                            </div>

                            <div className="bg-primary-light/30 p-3 rounded-xl border border-primary-light">
                                <p className="text-sm text-text-primary line-clamp-2">
                                    <span className="font-semibold text-primary mr-2">AI 요약:</span>
                                    {submission.ai_feedback?.summary}
                                </p>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </section>
    )
}
