import { Camera } from "lucide-react"
import { currentUser } from "@/shared/model/mockData"

export function ProfileHeader() {
    return (
        <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
            <div className="relative mb-4">
                <img
                    src={currentUser.profile_image}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-text-secondary hover:text-primary transition-colors">
                    <Camera size={16} />
                </button>
            </div>
            <h2 className="text-xl font-bold text-text-primary">{currentUser.name}</h2>
            <p className="text-text-secondary text-sm mt-1">학생 계정</p>
        </div>
    )
}
