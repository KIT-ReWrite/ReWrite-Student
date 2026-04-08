import { ArrowLeft } from "lucide-react"

export function AssignmentHeader({ onBack }: { onBack: () => void }) {
    return (
        <button
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
            <ArrowLeft size={18} />
            목록으로 돌아가기
        </button>
    )
}
