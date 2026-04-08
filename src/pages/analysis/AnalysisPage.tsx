import { PageLayout } from "@/shared/ui/PageLayout"
import { mockLearningStats } from "@/shared/model/mockData"
import { RadarChartCard } from "@/features/analysis/ui/RadarChartCard"
import { WeakPointsSection } from "@/features/analysis/ui/WeakPointsSection"
import { WeeklyChartCard } from "@/features/analysis/ui/WeeklyChartCard"

function AnalysisPage() {
    return (
        <PageLayout title="학습 분석" description="나의 학습 패턴과 약점을 분석합니다.">
            <WeakPointsSection points={mockLearningStats.weak_points} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeeklyChartCard data={mockLearningStats.weekly_scores} />
                <RadarChartCard data={mockLearningStats.radar_data} />
            </div>
        </PageLayout>
    )
}

export default AnalysisPage
