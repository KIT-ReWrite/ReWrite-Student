import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { AssignmentContent } from "@/features/assignments/ui/detail/AssignmentContent"
import { AssignmentHeader } from "@/features/assignments/ui/detail/AssignmentHeader"
import { AssignmentSidebar } from "@/features/assignments/ui/detail/AssignmentSidebar"
import { SubmissionCard } from "@/features/assignments/ui/detail/SubmissionCard"
import { useAssignmentDetailQuery } from "@/entities/assignments/queries/assignments.queries"

function AssignmentDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const assignmentId = Number(id)

    const { data: assignment, isLoading } = useAssignmentDetailQuery(assignmentId)

    if (isLoading) {
        return (
            <PageLayout>
                <div className="space-y-6">
                    <div className="h-6 w-32 bg-gray-100 animate-pulse rounded" />
                    <div className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
                    <div className="h-32 bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </PageLayout>
        )
    }

    if (!assignment) {
        return (
            <PageLayout>
                <div className="p-8 text-center">과제를 찾을 수 없습니다.</div>
            </PageLayout>
        )
    }

    const mySubmission = assignment.my_submission
    const isSubmitted = !!mySubmission && mySubmission.status !== "not_submitted"
    const hasFeedback = mySubmission?.status === "ai_done" || mySubmission?.status === "graded"

    return (
        <PageLayout>
            <AssignmentHeader onBack={() => navigate(-1)} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AssignmentContent assignment={assignment} />
                    {isSubmitted && mySubmission && <SubmissionCard submission={mySubmission} />}
                </div>

                <div className="space-y-6">
                    <AssignmentSidebar
                        assignment={assignment}
                        isSubmitted={isSubmitted}
                        hasFeedback={hasFeedback}
                        onSubmit={() => navigate(`/assignments/${id}/submit`)}
                        onFeedback={() => navigate(`/submissions/${mySubmission?.id}/feedback`)}
                        onEditSubmit={() => navigate(`/assignments/${id}/submit`)}
                    />
                </div>
            </div>
        </PageLayout>
    )
}

export default AssignmentDetailPage
