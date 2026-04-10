import { useRef, useState } from "react"
import { UploadCloud, X, Eye } from "lucide-react"
import { ImageViewerModal } from "@/shared/ui/ImageViewerModal"
import type { ISubmissionImage } from "@/entities/submissions/api/submissions.api.type"

interface Props {
    // 새로 추가할 파일
    images: File[]
    setImages: (images: File[]) => void
    // 기존 서버 이미지 (수정 시)
    existingImages?: ISubmissionImage[]
    onDeleteExisting?: (imageId: number) => void
}

export function ImageUploadBox({ images, setImages, existingImages, onDeleteExisting }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [viewerIndex, setViewerIndex] = useState<number | null>(null)
    const [viewerSource, setViewerSource] = useState<"existing" | "new">("existing")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? [])
        const valid = files.filter((f) => f.size <= 10 * 1024 * 1024)
        if (valid.length < files.length) alert("10MB 이하 이미지만 업로드 가능합니다.")
        setImages([...images, ...valid])
        e.target.value = ""
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"))
        setImages([...images, ...files])
    }

    const removeNew = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    // 뷰어용 URL 목록
    const existingUrls = existingImages?.map((img) => `${import.meta.env.VITE_API_BASE_URL}${img.image_url}`) ?? []
    const newUrls = images.map((f) => URL.createObjectURL(f))

    const openViewer = (source: "existing" | "new", index: number) => {
        setViewerSource(source)
        setViewerIndex(index)
    }

    const currentUrls = viewerSource === "existing" ? existingUrls : newUrls

    return (
        <div>
            <label className="block text-sm font-medium text-text-primary mb-2">첨부 이미지 (선택)</label>

            {/* 기존 이미지 (수정 모드) */}
            {existingImages && existingImages.length > 0 && (
                <div className="mb-3">
                    <p className="text-xs text-text-secondary mb-2">기존 이미지</p>
                    <div className="flex gap-2 flex-wrap">
                        {existingImages.map((img, index) => (
                            <div key={img.id} className="relative group">
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}${img.image_url}`}
                                    alt={`기존 이미지 ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                />
                                {/* 오버레이 버튼 */}
                                <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => openViewer("existing", index)}
                                        className="p-1 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                                    >
                                        <Eye size={14} className="text-white" />
                                    </button>
                                    {onDeleteExisting && (
                                        <button
                                            type="button"
                                            onClick={() => onDeleteExisting(img.id)}
                                            className="p-1 bg-accent/80 hover:bg-accent rounded-full transition-colors"
                                        >
                                            <X size={14} className="text-white" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 새 이미지 미리보기 */}
            {images.length > 0 && (
                <div className="mt-3">
                    <p className="text-xs text-text-secondary mb-2">새로 추가할 이미지</p>
                    <div className="flex gap-2 flex-wrap">
                        {images.map((file, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-20 h-20 object-cover rounded-lg border border-primary/30"
                                />
                                <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => openViewer("new", index)}
                                        className="p-1 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                                    >
                                        <Eye size={14} className="text-white" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeNew(index)}
                                        className="p-1 bg-accent/80 hover:bg-accent rounded-full transition-colors"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>
                                <p className="text-xs text-text-secondary mt-1 w-20 truncate text-center">
                                    {file.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 업로드 박스 */}
            <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
                <div className="flex flex-col items-center justify-center text-text-secondary">
                    <UploadCloud size={32} className="mb-3 text-gray-400" />
                    <p className="text-sm font-medium mb-1">클릭하거나 이미지를 드래그하여 업로드</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF (최대 10MB)</p>
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />

            {/* 이미지 뷰어 모달 */}
            {viewerIndex !== null && currentUrls.length > 0 && (
                <ImageViewerModal
                    images={currentUrls}
                    currentIndex={viewerIndex}
                    onClose={() => setViewerIndex(null)}
                    onPrev={() => setViewerIndex((i) => (i! - 1 + currentUrls.length) % currentUrls.length)}
                    onNext={() => setViewerIndex((i) => (i! + 1) % currentUrls.length)}
                />
            )}
        </div>
    )
}
