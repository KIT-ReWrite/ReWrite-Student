import { useState } from "react"
import { Plus } from "lucide-react"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ClassCard } from "@/features/classes/ui/classCard"
import { JoinClassModal } from "@/features/classes/ui/JoinClassModal"
import { useClassesQuery } from "@/entities/classes/queries/classes.queries"

function ClassesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data: classes = [], isLoading } = useClassesQuery()

    return (
        <PageLayout
            title="내 학급"
            description="참여 중인 학급 목록입니다."
            action={
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    학급 참가하기
                </button>
            }
        >
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : classes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
                    <p className="text-lg font-medium">참여 중인 학급이 없어요.</p>
                    <p className="text-sm mt-1">학급 참가하기 버튼을 눌러 학급에 참가해보세요!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls, index) => (
                        <ClassCard key={cls.id} cls={cls} index={index} />
                    ))}
                </div>
            )}

            <JoinClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </PageLayout>
    )
}

export default ClassesPage
