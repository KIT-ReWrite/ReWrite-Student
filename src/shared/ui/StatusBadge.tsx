import type { SubmissionStatus } from "@/shared/model/submission.type"

interface StatusBadgeProps {
    status: SubmissionStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusConfig = () => {
        switch (status) {
            case "not_submitted":
                return { label: "미제출", className: "bg-gray-100 text-gray-600" }
            case "submitted":
                return { label: "제출완료", className: "bg-secondary-light text-blue-600" }
            case "ai_done":
                return { label: "AI분석완료", className: "bg-primary-light text-primary-hover" }
            case "graded":
                return { label: "채점완료", className: "bg-green-100 text-success" }
            default:
                return { label: "알 수 없음", className: "bg-gray-100 text-gray-600" }
        }
    }

    const config = getStatusConfig()
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>{config.label}</span>
}
