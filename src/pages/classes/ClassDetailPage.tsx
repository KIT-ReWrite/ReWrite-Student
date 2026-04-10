import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ClassHeader } from "@/features/classes/ui/detail/ClassHeader"
import { ProgressCard } from "@/features/classes/ui/detail/ProgressCard"
import { AssignmentList } from "@/features/classes/ui/assignments/AssignmentList"
import { useClassDetailQuery, useClassAssignmentsQuery } from "@/entities/classes/queries/classes.queries"

function ClassDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const classId = Number(id)

    const { data: detail, isLoading: detailLoading } = useClassDetailQuery(classId)
    const { data: assignments = [], isLoading: assignmentsLoading } = useClassAssignmentsQuery(classId)

    if (detailLoading) {
        return (
            <PageLayout>
                <div className="space-y-4">
                    <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
                    <div className="h-20 bg-gray-100 animate-pulse rounded-2xl" />
                    <div className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </PageLayout>
        )
    }

    if (!detail) {
        return (
            <PageLayout>
                <div className="p-8 text-center text-text-secondary">학급을 찾을 수 없습니다.</div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <button
                onClick={() => navigate("/classes")}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                학급 목록으로
            </button>

            <ClassHeader detail={detail} />
            <ProgressCard assignments={assignments} />

            {assignmentsLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : (
                <AssignmentList assignments={assignments} />
            )}
        </PageLayout>
    )
}

export default ClassDetailPage
