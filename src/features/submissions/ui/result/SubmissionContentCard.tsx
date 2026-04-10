import { useState } from "react"
import { Card } from "@/shared/ui/Card"
import { FileText } from "lucide-react"
import { ImageViewerModal } from "@/shared/ui/ImageViewerModal"
import type { ISubmissionImage } from "@/entities/submissions/api/submissions.api.type"

interface Props {
    content: string
    images?: ISubmissionImage[]
}

export function SubmissionContentCard({ content, images }: Props) {
    const [viewerIndex, setViewerIndex] = useState<number | null>(null)

    const imageUrls = images?.map((img) => `${import.meta.env.VITE_API_BASE_URL}${img.image_url}`) ?? []

    return (
        <Card className="p-6">
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <FileText size={18} className="text-text-secondary" />
                제출한 내용
            </h3>

            {images && images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                    {images.map((img, index) => (
                        <button
                            key={img.id}
                            type="button"
                            onClick={() => setViewerIndex(index)}
                            className="focus:outline-none"
                        >
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${img.image_url}`}
                                alt={`제출 이미지 ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:opacity-80 hover:scale-105 transition-all cursor-pointer"
                            />
                        </button>
                    ))}
                </div>
            )}

            <div className="bg-gray-50 p-5 rounded-xl text-sm text-text-primary whitespace-pre-wrap leading-relaxed border border-gray-100 h-48 overflow-y-auto">
                {content}
            </div>

            {viewerIndex !== null && (
                <ImageViewerModal
                    images={imageUrls}
                    currentIndex={viewerIndex}
                    onClose={() => setViewerIndex(null)}
                    onPrev={() => setViewerIndex((i) => (i! - 1 + imageUrls.length) % imageUrls.length)}
                    onNext={() => setViewerIndex((i) => (i! + 1) % imageUrls.length)}
                />
            )}
        </Card>
    )
}
