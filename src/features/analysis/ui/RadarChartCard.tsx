import { Card } from "@/shared/ui/Card"
import { Target } from "lucide-react"
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from "recharts"

export function RadarChartCard({ data }: any) {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target className="text-secondary" size={20} />
                역량 분석
            </h2>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#E8F4F2" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{
                                fill: "#2D3436",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="내 역량" dataKey="A" stroke="#87CEEB" fill="#87CEEB" fillOpacity={0.5} />
                        <RechartsTooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
