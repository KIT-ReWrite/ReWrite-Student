import { Card } from "@/shared/ui/Card"
import { FileText } from "lucide-react"

export function SubmissionCard({ submission }: any) {
    return (
        <Card className="p-6 sm:p-8 border-primary/20">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="text-primary" size={20} />내 제출물
            </h2>

            <div className="bg-white border border-gray-200 p-5 rounded-xl text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                {submission.text_content}
            </div>
        </Card>
    )
}
