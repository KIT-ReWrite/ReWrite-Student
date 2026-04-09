import { PageLayout } from "@/shared/ui/PageLayout"
import { DueAssignmentsSection } from "@/features/dashboard/ui/DueAssignmentsSection"
import { RecentFeedbackSection } from "@/features/dashboard/ui/RecentFeedbackSection"
import { ProgressChartCard } from "@/features/dashboard/ui/ProgressChartCard"
import { LearningSummaryCard } from "@/features/dashboard/ui/LearningSummaryCard"
import { useMeQuery } from "@/entities/auth/queries/auth.queries"
import { useAssignmentsQuery } from "@/entities/assignments/queries/assignments.queries"

function DashboardPage() {
    const { data: me } = useMeQuery()
    const { data: allAssignments = [] } = useAssignmentsQuery()

    // 미제출 과제
    const dueAssignments = allAssignments.filter((a) => !a.my_status || a.my_status === "not_submitted")

    // 피드백 받은 제출물
    const recentFeedbacks = allAssignments
        .filter((a) => a.my_status === "ai_done" || a.my_status === "graded")
        .slice(0, 2)

    const submitted =
        allAssignments.filter((a) => a.my_status === "submitted").length +
        allAssignments.filter((a) => a.my_status === "ai_done").length
    const graded = allAssignments.filter((a) => a.my_status === "graded").length
    const notSubmitted = allAssignments.filter((a) => !a.my_status || a.my_status === "not_submitted").length

    const pieData = [
        { name: "미제출", value: notSubmitted, color: "#F3F4F6" },
        { name: "제출완료", value: submitted, color: "#87CEEB" },
        { name: "채점완료", value: graded, color: "#51CF66" },
    ]

    return (
        <PageLayout title={`안녕하세요, ${me?.name ?? ""}님! 👋`} description="오늘의 학습 현황을 확인해보세요.">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <DueAssignmentsSection assignments={dueAssignments} />
                    <RecentFeedbackSection assignments={recentFeedbacks} />
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
