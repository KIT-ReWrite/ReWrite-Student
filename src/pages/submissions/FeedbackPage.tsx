import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { mockSubmissions, mockAssignments } from "@/shared/model/mockData"
import { ArrowLeft } from "lucide-react"

import { AIFeedbackCard } from "@/features/submissions/ui/feedback/AIFeedbackCard"
import { TeacherFeedbackCard } from "@/features/submissions/ui/feedback/TeacherFeedbackCard"

function FeedbackPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const submission = mockSubmissions.find((s) => s.id === Number(id))
    const assignment = mockAssignments.find((a) => a.id === submission?.assignment_id)

    if (!submission || !assignment) return null

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
                <p className="text-text-secondary">{assignment.title}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <AIFeedbackCard aiFeedback={submission.ai_feedback} />
                <TeacherFeedbackCard teacherFeedback={submission.teacher_feedback} />
            </div>
        </PageLayout>
    )
}

export default FeedbackPage
