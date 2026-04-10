import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ArrowLeft } from "lucide-react"
import { useAssignmentDetailQuery } from "@/entities/assignments/queries/assignments.queries"
import {
    useSubmitAssignmentMutation,
    useUpdateSubmissionMutation,
} from "@/entities/submissions/queries/submissions.queries"
import { SubmitForm } from "@/features/submissions/ui/submit/SubmitForm"

function SubmitPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const assignmentId = Number(id)

    const { data: assignment, isLoading } = useAssignmentDetailQuery(assignmentId)

    const { mutate: submitAssignment, isPending: isSubmitting } = useSubmitAssignmentMutation(assignmentId)

    const existingSubmissionId = assignment?.my_submission?.id
    const { mutate: updateSubmission, isPending: isUpdating } = useUpdateSubmissionMutation(existingSubmissionId ?? 0)

    const isPending = isSubmitting || isUpdating

    const handleSubmit = (text_content: string, images?: File[]) => {
        // 이미 제출한 경우 수정
        if (existingSubmissionId) {
            updateSubmission(
                { text_content, images },
                {
                    onSuccess: (data) => navigate(`/assignments/${data.assignment_id}`),
                }
            )
        } else {
            submitAssignment(
                { text_content, images },
                {
                    onSuccess: (data) => navigate(`/assignments/${data.assignment_id}`),
                }
            )
        }
    }

    if (isLoading) {
        return (
            <PageLayout>
                <div className="max-w-4xl mx-auto space-y-4">
                    <div className="h-6 w-32 bg-gray-100 animate-pulse rounded" />
                    <div className="h-8 w-64 bg-gray-100 animate-pulse rounded" />
                    <div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </PageLayout>
        )
    }

    if (!assignment) return null

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    돌아가기
                </button>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                        {existingSubmissionId ? "과제 수정" : "과제 제출"}
                    </h1>
                    <p className="text-text-secondary">{assignment.title}</p>
                </div>

                <SubmitForm
                    assignment={assignment}
                    existingSubmission={assignment.my_submission}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate(-1)}
                    isPending={isPending}
                />
            </div>
        </PageLayout>
    )
}

export default SubmitPage
