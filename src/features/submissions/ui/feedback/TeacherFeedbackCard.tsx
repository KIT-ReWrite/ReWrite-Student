import { Card } from "@/shared/ui/Card"
import { UserCheck } from "lucide-react"

export function TeacherFeedbackCard({ teacherFeedback }: any) {
    return (
        <Card className="p-6 sm:p-8 border-t-4 border-t-secondary h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-secondary-light rounded-xl">
                        <UserCheck className="text-secondary" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-text-primary">선생님 피드백</h2>
                </div>

                {teacherFeedback?.score && (
                    <div className="text-2xl font-bold text-secondary">
                        {teacherFeedback.score}
                        <span className="text-sm text-text-secondary font-medium ml-1">/ 100</span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                {teacherFeedback ? (
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex-1">
                        <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
                            {teacherFeedback.feedback}
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-text-secondary bg-gray-50 rounded-xl border border-dashed border-gray-200 p-8 text-center">
                        <UserCheck size={32} className="text-gray-300 mb-3" />
                        <p>
                            선생님이 아직 채점하지 않았습니다.
                            <br />
                            AI 피드백을 먼저 확인해보세요.
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}
