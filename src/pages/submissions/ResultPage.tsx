import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { mockSubmissions, mockAssignments } from "@/shared/model/mockData"
import { AISummaryCard } from "@/features/submissions/ui/result/AISummaryCard"
import { SubmissionContentCard } from "@/features/submissions/ui/result/SubmissionContentCard"
import { SubmissionSuccess } from "@/features/submissions/ui/result/SubmissionSuccess"

function ResultPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const submission = mockSubmissions.find((s) => s.id === Number(id))
    const assignment = mockAssignments.find((a) => a.id === submission?.assignment_id)

    if (!submission || !assignment) return null

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto">
                <SubmissionSuccess />

                <AISummaryCard
                    summary={submission.ai_feedback?.summary}
                    onClick={() => navigate(`/submissions/${id}/feedback`)}
                />

                <SubmissionContentCard content={submission.text_content} />
            </div>
        </PageLayout>
    )
}

export default ResultPage
