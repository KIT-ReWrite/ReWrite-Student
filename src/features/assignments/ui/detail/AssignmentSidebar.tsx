import { Card } from "@/shared/ui/Card"
import { Calendar, Clock, FileText, CheckCircle } from "lucide-react"

export function AssignmentSidebar({ assignment, isSubmitted, hasFeedback, onSubmit, onFeedback }: any) {
    return (
        <Card className="p-6">
            <h3 className="font-bold text-text-primary mb-4 border-b border-gray-100 pb-3">과제 정보</h3>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 text-accent rounded-lg">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <div className="text-xs text-text-secondary mb-0.5">마감일</div>
                        <div className="text-sm font-medium text-text-primary">
                            {new Date(assignment.due_date).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                        <div className="text-xs text-accent mt-0.5 flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(assignment.due_date).toLocaleTimeString("ko-KR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
                {!isSubmitted ? (
                    <button
                        onClick={onSubmit}
                        className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        <FileText size={18} />
                        과제 제출하기
                    </button>
                ) : hasFeedback ? (
                    <button
                        onClick={onFeedback}
                        className="w-full py-3 bg-primary-light hover:bg-primary/20 text-primary-hover rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={18} />
                        피드백 확인하기
                    </button>
                ) : (
                    <div className="w-full py-3 bg-gray-100 text-text-secondary rounded-xl font-medium text-center flex items-center justify-center gap-2">
                        <Clock size={18} />
                        AI 피드백 생성 중...
                    </div>
                )}
            </div>
        </Card>
    )
}
