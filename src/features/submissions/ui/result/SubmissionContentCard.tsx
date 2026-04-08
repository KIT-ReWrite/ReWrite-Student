import { Card } from "@/shared/ui/Card"
import { FileText } from "lucide-react"

export function SubmissionContentCard({ content }: any) {
    return (
        <Card className="p-6">
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <FileText size={18} className="text-text-secondary" />
                제출한 내용
            </h3>

            <div className="bg-gray-50 p-5 rounded-xl text-sm text-text-primary whitespace-pre-wrap leading-relaxed border border-gray-100 h-48 overflow-y-auto">
                {content}
            </div>
        </Card>
    )
}
