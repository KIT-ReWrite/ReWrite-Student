export function SubmitActions({ isSubmitting, content, onCancel }: any) {
    return (
        <div className="flex justify-end gap-3">
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-xl border border-gray-200 text-text-secondary font-medium hover:bg-gray-50 transition-colors"
            >
                취소
            </button>

            <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
            >
                {isSubmitting ? "제출 중..." : "제출하기"}
            </button>
        </div>
    )
}
