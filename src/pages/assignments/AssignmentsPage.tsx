import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { AssignmentTabs } from "@/features/assignments/ui/AssignmentTabs"
import { AssignmentList } from "@/features/assignments/ui/AssignmentList"
import { useAssignmentsQuery } from "@/entities/assignments/queries/assignments.queries"

function AssignmentsPage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("all")

    const isSubmittedTab = activeTab === "submitted"

    const status = activeTab === "all" || isSubmittedTab ? undefined : activeTab

    const { data: assignments = [], isLoading } = useAssignmentsQuery(status)

    const filteredAssignments = isSubmittedTab
        ? assignments.filter((a) => a.my_status === "submitted" || a.my_status === "ai_done")
        : assignments

    const tabs = [
        { id: "all", label: "전체" },
        { id: "not_submitted", label: "미제출" },
        { id: "submitted", label: "제출완료" },
        { id: "graded", label: "채점완료" },
    ]

    return (
        <PageLayout title="과제 목록" description="모든 과제와 제출 상태를 확인하세요.">
            <AssignmentTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-28 bg-gray-100 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : (
                <AssignmentList
                    assignments={filteredAssignments}
                    onClick={(id: number) => navigate(`/assignments/${id}`)}
                />
            )}
        </PageLayout>
    )
}

export default AssignmentsPage
