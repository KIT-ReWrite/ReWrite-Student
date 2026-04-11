import { PageLayout } from "@/shared/ui/PageLayout"
import { RadarChartCard } from "@/features/analysis/ui/RadarChartCard"
import { WeakPointsSection } from "@/features/analysis/ui/WeakPointsSection"
import { WeeklyChartCard } from "@/features/analysis/ui/WeeklyChartCard"
import { useStudentMetricsQuery, useStudentScoresQuery } from "@/entities/students/queries/students.queries"
import { getStoredUser } from "@/shared/lib/auth"

function AnalysisPage() {
    const user = getStoredUser()
    const studentId = user?.id ?? ""

    const { data: metrics, isLoading: metricsLoading } = useStudentMetricsQuery(studentId)
    const { data: scores = [], isLoading: scoresLoading } = useStudentScoresQuery(studentId)

    // 레이더 차트 데이터 변환
    const radarData = metrics
        ? [
              { subject: "논리성", A: metrics.logical },
              { subject: "구조", A: metrics.structure },
              { subject: "문법", A: metrics.grammar },
              { subject: "창의성", A: metrics.creativity },
              { subject: "이해도", A: metrics.understanding },
          ]
        : []

    // 점수 추이 데이터 변환
    const weeklyData = scores.map((s, i) => ({
        week: `과제${i + 1}`,
        score: s.score,
        title: s.assignment.title,
    }))

    // 약점 추출 (점수 낮은 순 3개)
    const weakPoints = metrics
        ? Object.entries({
              논리성: metrics.logical,
              구조: metrics.structure,
              문법: metrics.grammar,
              창의성: metrics.creativity,
              이해도: metrics.understanding,
          })
              .sort((a, b) => a[1] - b[1])
              .slice(0, 3)
              .map(([label, score]) => `${label} (${score}점)`)
        : []

    const isLoading = metricsLoading || scoresLoading

    return (
        <PageLayout title="학습 분석" description="나의 학습 패턴과 약점을 분석합니다.">
            {isLoading ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
                        <div className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
                    </div>
                </div>
            ) : !metrics ? (
                <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
                    <p className="text-lg font-medium">아직 분석 데이터가 없습니다.</p>
                    <p className="text-sm mt-1">과제를 제출하면 AI가 역량을 분석해드립니다.</p>
                </div>
            ) : (
                <>
                    <WeakPointsSection points={weakPoints} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <WeeklyChartCard data={weeklyData} />
                        <RadarChartCard data={radarData} />
                    </div>
                </>
            )}
        </PageLayout>
    )
}

export default AnalysisPage
