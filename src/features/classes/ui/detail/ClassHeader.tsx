import { Users } from "lucide-react"

export function ClassHeader({ cls }: any) {
    return (
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">{cls.name}</h1>

            <div className="flex items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                        {cls.teacher_name.charAt(0)}
                    </div>
                    {cls.teacher_name} 선생님
                </div>

                <span className="flex items-center gap-1">
                    <Users size={16} />
                    학생 {cls.student_count}명
                </span>
            </div>
        </div>
    )
}
