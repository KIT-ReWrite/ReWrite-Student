import { useState } from "react"
import { Card } from "@/shared/ui/Card"
import { FileText } from "lucide-react"
import { ImageViewerModal } from "@/shared/ui/ImageViewerModal"
import type { IMySubmission } from "@/entities/assignments/api/assignments.api.type"

export function SubmissionCard({ submission }: { submission: IMySubmission }) {
    const [viewerIndex, setViewerIndex] = useState<number | null>(null)

    // 미리보기용 URL 목록
    const urls = submission.images?.map((img) => `${import.meta.env.VITE_API_BASE_URL}${img.image_url}`) ?? []

    const openViewer = (index: number) => {
        setViewerIndex(index)
    }

    return (
        <Card className="p-6 sm:p-8 border-primary/20">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="text-primary" size={20} />내 제출물
            </h2>

            {/* 이미지 리스트 */}
            {submission.images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                    {submission.images.map((img, index) => (
                        <button
                            key={img.id}
                            type="button"
                            onClick={() => openViewer(index)}
                            className="focus:outline-none"
                        >
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${img.image_url}`}
                                alt="제출 이미지"
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* 텍스트 내용 */}
            <div className="bg-white border border-gray-200 p-5 rounded-xl text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                {submission.text_content}
            </div>

            <div className="mt-3 text-xs text-text-secondary text-right">
                제출일: {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString("ko-KR") : "-"}
            </div>

            {/* 이미지 뷰어 모달 */}
            {viewerIndex !== null && urls.length > 0 && (
                <ImageViewerModal
                    images={urls}
                    currentIndex={viewerIndex}
                    onClose={() => setViewerIndex(null)}
                    onPrev={() => setViewerIndex((i) => (i! - 1 + urls.length) % urls.length)}
                    onNext={() => setViewerIndex((i) => (i! + 1) % urls.length)}
                />
            )}
        </Card>
    )
}
