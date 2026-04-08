import { Card } from "@/shared/ui/Card"
import { AlertTriangle } from "lucide-react"

export function WeakPointsSection({ points }: { points: string[] }) {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-accent" size={20} />
                집중 개선이 필요한 부분
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {points.map((point, index) => (
                    <Card key={index} className="p-4 border-l-4 border-l-accent bg-red-50/30">
                        <div className="font-medium text-text-primary">{point}</div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
