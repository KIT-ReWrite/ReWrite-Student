import { PageLayout } from "@/shared/ui/PageLayout"
import { mockAssignments, mockSubmissions, currentUser } from "@/shared/model/mockData"

import { DueAssignmentsSection } from "@/features/dashboard/ui/DueAssignmentsSection"
import { RecentFeedbackSection } from "@/features/dashboard/ui/RecentFeedbackSection"
import { ProgressChartCard } from "@/features/dashboard/ui/ProgressChartCard"
import { LearningSummaryCard } from "@/features/dashboard/ui/LearningSummaryCard"

function DashboardPage() {
    const dueAssignments = mockAssignments.filter((a) => a.status === "not_submitted")

    const recentFeedbacks = mockSubmissions
        .filter((s) => s.status === "feedback_ready" || s.status === "graded")
        .slice(0, 2)

    const pieData = [
        { name: "미제출", value: dueAssignments.length, color: "#F3F4F6" },
        { name: "제출완료", value: 2, color: "#87CEEB" },
        { name: "피드백완료", value: 1, color: "#4ECDC4" },
    ]

    return (
        <PageLayout
            role="student"
            title={`안녕하세요, ${currentUser.name}님! 👋`}
            description="오늘의 학습 현황을 확인해보세요."
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <DueAssignmentsSection assignments={dueAssignments} />
                    <RecentFeedbackSection submissions={recentFeedbacks} assignments={mockAssignments} />
                </div>

                <div className="space-y-6">
                    <ProgressChartCard data={pieData} />
                    <LearningSummaryCard />
                </div>
            </div>
        </PageLayout>
    )
}

export default DashboardPage
