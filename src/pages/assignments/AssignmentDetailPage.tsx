import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { mockAssignments, mockSubmissions } from "@/shared/model/mockData"
import { AssignmentContent } from "@/features/assignments/ui/detail/AssignmentContent"
import { AssignmentHeader } from "@/features/assignments/ui/detail/AssignmentHeader"
import { AssignmentSidebar } from "@/features/assignments/ui/detail/AssignmentSidebar"
import { SubmissionCard } from "@/features/assignments/ui/detail/SubmissionCard"

function AssignmentDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const assignment = mockAssignments.find((a) => a.id === Number(id))
    const submission = mockSubmissions.find((s) => s.assignment_id === Number(id))

    if (!assignment) {
        return (
            <PageLayout>
                <div className="p-8 text-center">과제를 찾을 수 없습니다.</div>
            </PageLayout>
        )
    }

    const isSubmitted = assignment.status !== "not_submitted"
    const hasFeedback = assignment.status === "feedback_ready" || assignment.status === "graded"

    return (
        <PageLayout>
            <AssignmentHeader onBack={() => navigate(-1)} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AssignmentContent assignment={assignment} />

                    {isSubmitted && submission && <SubmissionCard submission={submission} />}
                </div>

                <div className="space-y-6">
                    <AssignmentSidebar
                        assignment={assignment}
                        submission={submission}
                        isSubmitted={isSubmitted}
                        hasFeedback={hasFeedback}
                        onSubmit={() => navigate(`/assignments/${id}/submit`)}
                        onFeedback={() => navigate(`/submissions/${submission?.id}/feedback`)}
                    />
                </div>
            </div>
        </PageLayout>
    )
}

export default AssignmentDetailPage
