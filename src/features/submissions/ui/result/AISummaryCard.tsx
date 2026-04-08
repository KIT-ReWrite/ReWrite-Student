import { Card } from "@/shared/ui/Card"
import { Sparkles, ArrowRight } from "lucide-react"

export function AISummaryCard({ summary, onClick }: any) {
    return (
        <Card className="p-6 sm:p-8 mb-8 border-t-4 border-t-primary">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="p-3 bg-primary-light rounded-xl">
                    <Sparkles className="text-primary" size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-text-primary">AI 분석 요약</h2>
                    <p className="text-sm text-text-secondary">작성하신 글에 대한 AI의 첫인상입니다.</p>
                </div>
            </div>

            <p className="text-text-primary leading-relaxed">
                {summary || "AI가 글을 분석하는 중입니다. 잠시만 기다려주세요."}
            </p>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onClick}
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    상세 피드백 보기
                    <ArrowRight size={18} />
                </button>
            </div>
        </Card>
    )
}
