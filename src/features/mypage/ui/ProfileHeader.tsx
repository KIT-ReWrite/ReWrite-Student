import { useRef } from "react"
import { Camera } from "lucide-react"
import { useMeQuery, useUpdateProfileImageMutation } from "@/entities/auth/queries/auth.queries"

export function ProfileHeader() {
    const { data: me, isLoading } = useMeQuery()
    const { mutate: updateImage, isPending: isUploading } = useUpdateProfileImageMutation()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.size > 5 * 1024 * 1024) {
            alert("이미지 크기는 5MB 이하여야 합니다.")
            return
        }
        updateImage(file)
        e.target.value = ""
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
                <div className="w-24 h-24 rounded-full bg-gray-100 animate-pulse mb-4" />
                <div className="h-6 w-32 bg-gray-100 animate-pulse rounded" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
            <div className="relative mb-4">
                {me?.profile_image ? (
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${me.profile_image}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-primary flex items-center justify-center text-white text-3xl font-bold">
                        {me?.name?.charAt(0) ?? "S"}
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-text-secondary hover:text-primary transition-colors disabled:opacity-50"
                >
                    {isUploading ? (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Camera size={16} />
                    )}
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <h2 className="text-xl font-bold text-text-primary">{me?.name}</h2>
            <p className="text-text-secondary text-sm mt-1">학생 계정</p>
        </div>
    )
}
