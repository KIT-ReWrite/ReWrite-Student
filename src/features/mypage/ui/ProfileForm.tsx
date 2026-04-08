import { User, Building, Hash } from "lucide-react"
import { currentUser } from "@/shared/model/mockData"

export function ProfileForm() {
    return (
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-text-primary mb-1">이름</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" className="notion-input pl-10" defaultValue={currentUser.name} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-primary mb-1">학교</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" className="notion-input pl-10" defaultValue={currentUser.school} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-primary mb-1">학번</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" className="notion-input pl-10" defaultValue={currentUser.student_number} />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="button"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors"
                >
                    변경사항 저장
                </button>
            </div>
        </form>
    )
}
