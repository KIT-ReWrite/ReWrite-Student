import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { mockAssignments } from "@/shared/model/mockData"
import { ArrowLeft } from "lucide-react"

import { SubmitForm } from "@/features/submissions/ui/submit/SubmitForm"

function SubmitPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const assignment = mockAssignments.find((a) => a.id === Number(id))

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
                    <h1 className="text-2xl font-bold text-text-primary mb-2">과제 제출</h1>
                    <p className="text-text-secondary">{assignment.title}</p>
                </div>

                <SubmitForm
                    assignment={assignment}
                    onSubmit={() => navigate(`/submissions/101`)}
                    onCancel={() => navigate(-1)}
                />
            </div>
        </PageLayout>
    )
}

export default SubmitPage
