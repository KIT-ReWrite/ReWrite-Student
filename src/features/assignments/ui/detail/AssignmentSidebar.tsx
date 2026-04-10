import { Card } from "@/shared/ui/Card"
import { Calendar, Clock, FileText, CheckCircle, Edit } from "lucide-react"
import type { IAssignmentDetail } from "@/entities/assignments/api/assignments.api.type"

interface Props {
    assignment: IAssignmentDetail
    isSubmitted: boolean
    hasFeedback: boolean
    onSubmit: () => void
    onFeedback: () => void
    onEditSubmit: () => void
}

export function AssignmentSidebar({ assignment, isSubmitted, hasFeedback, onSubmit, onFeedback, onEditSubmit }: Props) {
    const isPast = new Date(assignment.due_date) < new Date()

    return (
        <Card className="p-6">
            <h3 className="font-bold text-text-primary mb-4 border-b border-gray-100 pb-3">과제 정보</h3>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-50 text-accent rounded-lg shrink-0">
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

                {/* 제출 통계 */}
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary-light text-primary rounded-lg shrink-0">
                        <FileText size={18} />
                    </div>
                    <div>
                        <div className="text-xs text-text-secondary mb-0.5">제출 현황</div>
                        <div className="text-sm font-medium text-text-primary">
                            {assignment.stats.submitted_count} / {assignment.stats.total_students}명 제출
                        </div>
                        <div className="text-xs text-text-secondary mt-0.5">
                            제출률 {assignment.stats.submission_rate}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                {!isSubmitted ? (
                    <button
                        onClick={onSubmit}
                        disabled={isPast}
                        className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileText size={18} />
                        {isPast ? "마감된 과제입니다" : "과제 제출하기"}
                    </button>
                ) : (
                    <>
                        {hasFeedback && (
                            <button
                                onClick={onFeedback}
                                className="w-full py-3 bg-primary-light hover:bg-primary/20 text-primary-hover rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={18} />
                                피드백 확인하기
                            </button>
                        )}

                        {!hasFeedback && (
                            <div className="w-full py-3 bg-gray-100 text-text-secondary rounded-xl font-medium text-center flex items-center justify-center gap-2">
                                <Clock size={18} />
                                AI 피드백 생성 중...
                            </div>
                        )}

                        {!isPast && (
                            <button
                                onClick={onEditSubmit}
                                className="w-full py-3 border border-gray-200 text-text-secondary hover:bg-gray-50 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <Edit size={18} />
                                제출물 수정하기
                            </button>
                        )}
                    </>
                )}
            </div>
        </Card>
    )
}
