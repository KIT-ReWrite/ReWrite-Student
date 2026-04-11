import { Card } from "@/shared/ui/Card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

interface ChartData {
    week: string
    score: number
    title: string
}

export function WeeklyChartCard({ data }: { data: ChartData[] }) {
    if (data.length === 0) {
        return (
            <Card className="p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="text-primary" size={20} />
                    점수 추이
                </h2>
                <div className="h-64 flex items-center justify-center text-text-secondary text-sm">
                    아직 점수 기록이 없습니다.
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                점수 추이
            </h2>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F4F2" />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#636E72", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            domain={[0, 100]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#636E72", fontSize: 12 }}
                        />
                        <RechartsTooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "none",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            }}
                            formatter={(value, _, props) => [`${value}점`, props.payload.title]}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#4ECDC4"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#4ECDC4", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
