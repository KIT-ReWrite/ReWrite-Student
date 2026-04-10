import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
    images: string[]
    currentIndex: number
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}

export function ImageViewerModal({ images, currentIndex, onClose, onPrev, onNext }: Props) {
    // 키보드 이벤트
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") onPrev()
            if (e.key === "ArrowRight") onNext()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [onClose, onPrev, onNext])

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
                {/* 닫기 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* 이미지 카운터 */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* 이전 */}
                {images.length > 1 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onPrev()
                        }}
                        className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}

                {/* 이미지 */}
                <motion.img
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    src={images[currentIndex]}
                    alt={`이미지 ${currentIndex + 1}`}
                    className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                />

                {/* 다음 */}
                {images.length > 1 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onNext()
                        }}
                        className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                        <ChevronRight size={32} />
                    </button>
                )}

                {/* 하단 썸네일 */}
                {images.length > 1 && (
                    <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    i === currentIndex ? "bg-white" : "bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AnimatePresence>
    )
}
