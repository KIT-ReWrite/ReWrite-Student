import { useState } from "react"
import { Card } from "@/shared/ui/Card"
import { ContentTextarea } from "./ContentTextarea"
import { ImageUploadBox } from "./ImageUploadBox"
import { SubmitActions } from "./SubmitActions"
import { useDeleteSubmissionImageMutation } from "@/entities/submissions/queries/submissions.queries"
import type { IMySubmission } from "@/entities/assignments/api/assignments.api.type"
import type { ISubmissionImage } from "@/entities/submissions/api/submissions.api.type"

interface Props {
    assignment: any
    existingSubmission?: IMySubmission | null
    onSubmit: (text_content: string, images?: File[]) => void
    onCancel: () => void
    isPending: boolean
}

export function SubmitForm({ existingSubmission, onSubmit, onCancel, isPending }: Props) {
    const [content, setContent] = useState(existingSubmission?.text_content ?? "")
    const [images, setImages] = useState<File[]>([])

    // 기존 이미지 상태 관리 (삭제된 것 제외)
    const [existingImages, setExistingImages] = useState<ISubmissionImage[]>(existingSubmission?.images ?? [])

    const { mutate: deleteImage } = useDeleteSubmissionImageMutation(existingSubmission?.id ?? 0)

    const handleDeleteExisting = (imageId: number) => {
        if (!confirm("이미지를 삭제하시겠습니까?")) return
        deleteImage(imageId, {
            onSuccess: () => {
                setExistingImages((prev) => prev.filter((img) => img.id !== imageId))
            },
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return
        onSubmit(content, images.length > 0 ? images : undefined)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="p-6 sm:p-8 mb-6">
                <div className="space-y-6">
                    <ContentTextarea content={content} setContent={setContent} />
                    <ImageUploadBox
                        images={images}
                        setImages={setImages}
                        existingImages={existingSubmission ? existingImages : undefined}
                        onDeleteExisting={existingSubmission ? handleDeleteExisting : undefined}
                    />
                </div>
            </Card>
            <SubmitActions
                isSubmitting={isPending}
                content={content}
                onCancel={onCancel}
                isEdit={!!existingSubmission}
            />
        </form>
    )
}
