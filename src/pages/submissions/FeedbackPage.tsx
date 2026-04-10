import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ArrowLeft } from "lucide-react"
import { useSubmissionDetailQuery } from "@/entities/submissions/queries/submissions.queries"
import { AIFeedbackCard } from "@/features/submissions/ui/feedback/AIFeedbackCard"
import { TeacherFeedbackCard } from "@/features/submissions/ui/feedback/TeacherFeedbackCard"

function FeedbackPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const submissionId = Number(id)

    const { data: submission, isLoading } = useSubmissionDetailQuery(submissionId)

    if (isLoading) {
        return (
            <PageLayout>
                <div className="space-y-4">
                    <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
                        <div className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
                    </div>
                </div>
            </PageLayout>
        )
    }

    if (!submission) return null

    return (
        <PageLayout>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                돌아가기
            </button>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary mb-2">피드백 리포트</h1>
                <p className="text-text-secondary">{submission.assignment?.title ?? "-"}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <AIFeedbackCard aiFeedback={submission.ai_feedback ?? null} status={submission.status} />
                <TeacherFeedbackCard teacherFeedback={submission.teacher_feedback ?? null} />
            </div>
        </PageLayout>
    )
}

export default FeedbackPage
