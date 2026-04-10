import { Card } from "@/shared/ui/Card"
import { Sparkles, Loader2 } from "lucide-react"
import type { IAIFeedback } from "@/entities/submissions/api/submissions.api.type"

const METRIC_LABELS: Record<string, string> = {
    logical: "논리성",
    structure: "구조",
    grammar: "문법",
    creativity: "창의성",
    understanding: "이해도",
}

interface Props {
    aiFeedback: IAIFeedback | null
    status: string
}

export function AIFeedbackCard({ aiFeedback, status }: Props) {
    const isAnalyzing = status === "submitted"

    return (
        <Card className="p-6 sm:p-8 border-t-4 border-t-primary h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary-light rounded-xl">
                    <Sparkles className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-bold text-text-primary">AI 피드백</h2>
            </div>

            {isAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-secondary py-8">
                    <Loader2 size={32} className="animate-spin text-primary" />
                    <p>AI가 분석 중입니다...</p>
                </div>
            ) : !aiFeedback ? (
                <div className="flex-1 flex items-center justify-center text-text-secondary py-8">
                    AI 분석 결과가 없습니다.
                </div>
            ) : (
                <div className="space-y-5 flex-1">
                    {/* 총평 */}
                    <div>
                        <h3 className="text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider">총평</h3>
                        <div className="bg-primary-light/30 p-4 rounded-xl border border-primary-light text-text-primary">
                            {aiFeedback.summary}
                        </div>
                    </div>

                    {/* 상세 분석 */}
                    <div>
                        <h3 className="text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider">
                            상세 분석
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(aiFeedback.detail_analysis).map(([key, val]) => (
                                <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-text-secondary w-14 shrink-0">
                                                {METRIC_LABELS[key] ?? key}
                                            </span>
                                            <span className="text-sm text-text-primary">{val.comment}</span>
                                        </div>
                                        <span
                                            className={`text-sm font-bold shrink-0 ml-2 ${
                                                val.score >= 80
                                                    ? "text-success"
                                                    : val.score >= 60
                                                      ? "text-primary"
                                                      : "text-accent"
                                            }`}
                                        >
                                            {val.score}점
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 개선 제안 */}
                    <div>
                        <h3 className="text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider">
                            개선 제안
                        </h3>
                        <ul className="space-y-2">
                            {aiFeedback.improvement_suggestions.map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                                    <span className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </Card>
    )
}
