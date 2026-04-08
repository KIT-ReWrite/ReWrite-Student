import { Card } from "@/shared/ui/Card"
import { Sparkles } from "lucide-react"

export function AIFeedbackCard({ aiFeedback }: any) {
    return (
        <Card className="p-6 sm:p-8 border-t-4 border-t-primary h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary-light rounded-xl">
                    <Sparkles className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-bold text-text-primary">AI 피드백</h2>
            </div>

            <div className="space-y-6 flex-1">
                <div>
                    <h3 className="text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">총평</h3>
                    <div className="bg-primary-light/30 p-4 rounded-xl border border-primary-light text-text-primary font-medium">
                        {aiFeedback?.summary}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">상세 분석</h3>
                    <p className="text-text-primary leading-relaxed whitespace-pre-wrap">{aiFeedback?.feedback}</p>
                </div>
            </div>
        </Card>
    )
}
