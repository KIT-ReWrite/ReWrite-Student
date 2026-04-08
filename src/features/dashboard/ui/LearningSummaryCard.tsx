import { Card } from "@/shared/ui/Card"
import { useNavigate } from "react-router-dom"

export function LearningSummaryCard() {
    const navigate = useNavigate()

    return (
        <Card className="p-6 bg-linear-to-br from-primary-light to-white border-primary/20">
            <h2 className="text-lg font-bold mb-4">이번 주 학습 요약</h2>

            <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>
                        논리적인 글쓰기 능력이 <strong>15% 향상</strong>
                    </span>
                </li>

                <li className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>'구체적 사례 제시' 보완 필요</span>
                </li>

                <li className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>총 3건 과제 제출</span>
                </li>
            </ul>

            <button
                onClick={() => navigate("/analysis")}
                className="w-full mt-6 py-2 bg-white border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary-light"
            >
                상세 분석 보기
            </button>
        </Card>
    )
}
