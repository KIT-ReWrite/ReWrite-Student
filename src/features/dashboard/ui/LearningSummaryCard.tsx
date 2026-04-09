import { Card } from "@/shared/ui/Card"
import { useNavigate } from "react-router-dom"
import { useStudentMetricsQuery, useStudentScoresQuery } from "@/entities/students/queries/students.queries"
import { getStoredUser } from "@/shared/lib/auth"

export function LearningSummaryCard() {
    const navigate = useNavigate()
    const user = getStoredUser()
    const { data: metrics } = useStudentMetricsQuery(user?.id ?? "")
    const { data: scores = [] } = useStudentScoresQuery(user?.id ?? "")

    // 가장 낮은 역량
    const weakPoint = metrics
        ? Object.entries({
              논리성: metrics.logical,
              구조: metrics.structure,
              문법: metrics.grammar,
              창의성: metrics.creativity,
              이해도: metrics.understanding,
          }).sort((a, b) => a[1] - b[1])[0]
        : null

    // 최근 점수 변화
    const recentScores = scores.slice(-2)
    const scoreDiff = recentScores.length === 2 ? recentScores[1].score - recentScores[0].score : null

    return (
        <Card className="p-6 bg-linear-to-br from-primary-light to-white border-primary/20">
            <h2 className="text-lg font-bold mb-4">이번 주 학습 요약</h2>
            <ul className="space-y-3">
                {scoreDiff !== null && (
                    <li className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>
                            최근 점수{" "}
                            {scoreDiff >= 0 ? (
                                <strong className="text-success">+{scoreDiff}점 향상</strong>
                            ) : (
                                <strong className="text-accent">{scoreDiff}점 하락</strong>
                            )}
                        </span>
                    </li>
                )}
                {weakPoint && (
                    <li className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>
                            <strong>{weakPoint[0]}</strong> 영역 집중 보완 필요 ({weakPoint[1]}점)
                        </span>
                    </li>
                )}
                <li className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>총 {scores.length}건 과제 제출</span>
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
