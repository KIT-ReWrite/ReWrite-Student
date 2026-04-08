import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Users, Calendar, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { mockClasses, mockAssignments } from "@/shared/model/mockData"
import { Card } from "@/shared/ui/Card"
import { PageLayout } from "@/shared/ui/PageLayout"
import { StatusBadge } from "@/shared/ui/StatusBadge"

function ClassDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const cls = mockClasses.find((c) => c.id === Number(id))
    const classAssignments = mockAssignments.filter((a) => a.class_id === Number(id))
    if (!cls) {
        return (
            <PageLayout>
                <div className="p-8 text-center text-text-secondary">학급을 찾을 수 없습니다.</div>
            </PageLayout>
        )
    }
    const completedCount = classAssignments.filter((a) => a.status !== "not_submitted").length
    const totalCount = classAssignments.length
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
    return (
        <PageLayout>
            <button
                onClick={() => navigate("/classes")}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                학급 목록으로
            </button>

            {/* Class Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary mb-2">{cls.name}</h1>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                            {cls.teacher_name.charAt(0)}
                        </div>
                        {cls.teacher_name} 선생님
                    </div>
                    <span className="flex items-center gap-1">
                        <Users size={16} />
                        학생 {cls.student_count}명
                    </span>
                </div>
            </div>

            {/* Progress Section */}
            <Card className="p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <h2 className="text-lg font-bold text-text-primary">나의 진행률</h2>
                    <span className="text-sm text-text-secondary">
                        {completedCount}/{totalCount} 과제 완료
                    </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: `${progressPercent}%`,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    />
                </div>
                <div className="text-right mt-2 text-sm font-bold text-primary">{progressPercent}%</div>
            </Card>

            {/* Assignment List */}
            <div>
                <h2 className="text-lg font-bold text-text-primary mb-4">과제 목록</h2>
                <div className="space-y-4">
                    {classAssignments.length > 0 ? (
                        classAssignments.map((assignment, index) => (
                            <motion.div
                                key={assignment.id}
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.05,
                                }}
                            >
                                <Card
                                    hoverable
                                    onClick={() => navigate(`/assignments/${assignment.id}`)}
                                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <StatusBadge status={assignment.status} />
                                        </div>
                                        <h3 className="text-lg font-bold text-text-primary mb-1">{assignment.title}</h3>
                                        <p className="text-sm text-text-secondary line-clamp-1">
                                            {assignment.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-6">
                                        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                                            <Calendar size={16} />
                                            {new Date(assignment.due_date).toLocaleDateString("ko-KR")}
                                        </div>
                                        <ChevronRight size={18} className="text-gray-400" />
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-16 text-text-secondary bg-white rounded-2xl border border-dashed border-gray-200">
                            아직 등록된 과제가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    )
}

export default ClassDetailPage
