import { Users } from "lucide-react"
import type { IClassDetail } from "@/entities/classes/api/classes.api.type"
import { useUserByIdQuery } from "@/entities/auth/queries/auth.queries"

export function ClassHeader({ detail }: { detail: IClassDetail }) {
    const { class: cls, teacher, student_count } = detail
    const { data: teacherProfile } = useUserByIdQuery(teacher.id)

    const profileImageSrc = teacherProfile?.profile_image
        ? `${import.meta.env.VITE_API_BASE_URL}${teacherProfile.profile_image}`
        : null

    return (
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">{cls.name}</h1>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-1.5">
                    {profileImageSrc ? (
                        <img src={profileImageSrc} alt={teacher.name} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                            {teacher.name.charAt(0)}
                        </div>
                    )}
                    {teacher.name} 선생님
                </div>
                <span className="flex items-center gap-1">
                    <Users size={16} />
                    학생 {student_count}명
                </span>
            </div>
        </div>
    )
}
