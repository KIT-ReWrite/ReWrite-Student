import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { useSubmissionDetailQuery } from "@/entities/submissions/queries/submissions.queries"
import { AISummaryCard } from "@/features/submissions/ui/result/AISummaryCard"
import { SubmissionContentCard } from "@/features/submissions/ui/result/SubmissionContentCard"
import { SubmissionSuccess } from "@/features/submissions/ui/result/SubmissionSuccess"

function ResultPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const submissionId = Number(id)

    const { data: submission, isLoading } = useSubmissionDetailQuery(submissionId)

    if (isLoading) {
        return (
            <PageLayout>
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
                    <div className="h-32 bg-gray-100 animate-pulse rounded-2xl" />
                    <div className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </PageLayout>
        )
    }

    if (!submission) return null

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto">
                <SubmissionSuccess />

                <AISummaryCard
                    summary={submission.ai_feedback?.summary}
                    status={submission.status}
                    onClick={() => navigate(`/submissions/${id}/feedback`)}
                />

                <SubmissionContentCard content={submission.text_content} images={submission.images} />
            </div>
        </PageLayout>
    )
}

export default ResultPage
