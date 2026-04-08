import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { mockAssignments } from "@/shared/model/mockData"
import { AssignmentTabs } from "@/features/assignments/ui/AssignmentTabs"
import { AssignmentList } from "@/features/assignments/ui/AssignmentList"

function AssignmentsPage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("all")

    const tabs = [
        { id: "all", label: "전체" },
        { id: "not_submitted", label: "미제출" },
        { id: "submitted", label: "제출완료" },
        { id: "feedback_ready", label: "피드백완료" },
    ]

    const filteredAssignments = mockAssignments.filter((a) => {
        if (activeTab === "all") return true
        if (activeTab === "feedback_ready") return a.status === "feedback_ready" || a.status === "graded"
        return a.status === activeTab
    })

    return (
        <PageLayout title="과제 목록" description="모든 과제와 제출 상태를 확인하세요.">
            <AssignmentTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            <AssignmentList
                assignments={filteredAssignments}
                onClick={(id: number) => navigate(`/assignments/${id}`)}
            />
        </PageLayout>
    )
}

export default AssignmentsPage
