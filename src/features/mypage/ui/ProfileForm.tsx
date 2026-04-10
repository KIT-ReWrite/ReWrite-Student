import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { User, Building, Hash } from "lucide-react"
import { useMeQuery, useUpdateMeMutation } from "@/entities/auth/queries/auth.queries"
import type { IUpdateUserRequest } from "@/entities/auth/api/auth.api.type"

export function ProfileForm() {
    const { data: me, isLoading } = useMeQuery()
    const { mutate: updateMe, isPending } = useUpdateMeMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<IUpdateUserRequest>({
        defaultValues: { name: "", school: "", student_number: "" },
    })

    useEffect(() => {
        if (me) {
            reset({
                name: me.name,
                school: me.school,
                student_number: me.student_number ?? "",
            })
        }
    }, [me, reset])

    const onSubmit = (data: IUpdateUserRequest) => updateMe(data)

    if (isLoading) {
        return (
            <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-xl" />
                ))}
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-text-primary mb-1">이름</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input className="notion-input pl-10" placeholder="이름을 입력하세요" {...register("name")} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-primary mb-1">학교</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input className="notion-input pl-10" placeholder="학교명을 입력하세요" {...register("school")} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-primary mb-1">학번</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        className="notion-input pl-10"
                        placeholder="학번을 입력하세요"
                        {...register("student_number")}
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={!isDirty || isPending}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "저장 중..." : "변경사항 저장"}
                </button>
            </div>
        </form>
    )
}
