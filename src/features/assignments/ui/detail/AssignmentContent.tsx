import { Card } from "@/shared/ui/Card"
import { StatusBadge } from "@/shared/ui/StatusBadge"

export function AssignmentContent({ assignment }: any) {
    return (
        <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-text-secondary bg-gray-100 px-3 py-1 rounded-lg">
                    {assignment.class_name}
                </span>
                <StatusBadge status={assignment.status} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">{assignment.title}</h1>

            <div className="prose prose-sm sm:prose-base max-w-none text-text-primary">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 whitespace-pre-wrap leading-relaxed">
                    {assignment.description}
                </div>
            </div>
        </Card>
    )
}
