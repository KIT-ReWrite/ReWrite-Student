import { UploadCloud } from "lucide-react"

export function ImageUploadBox() {
    return (
        <div>
            <label className="block text-sm font-medium text-text-primary mb-2">첨부 이미지 (선택)</label>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center justify-center text-text-secondary">
                    <UploadCloud size={32} className="mb-3 text-gray-400" />
                    <p className="text-sm font-medium mb-1">클릭하거나 이미지를 드래그하여 업로드</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF (최대 10MB)</p>
                </div>
            </div>
        </div>
    )
}
