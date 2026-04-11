import { Card } from "@/shared/ui/Card"
import { AlertTriangle } from "lucide-react"

export function WeakPointsSection({ points }: { points: string[] }) {
    if (points.length === 0) return null

    return (
        <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-accent" size={20} />
                집중 개선이 필요한 부분
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {points.map((point, index) => (
                    <Card key={index} className="p-4 border-l-4 border-l-accent bg-red-50/30">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-100 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                                {index + 1}
                            </div>
                            <div className="font-medium text-text-primary text-sm">{point}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
