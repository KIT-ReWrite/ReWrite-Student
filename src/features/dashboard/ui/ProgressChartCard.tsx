import { Card } from "@/shared/ui/Card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function ProgressChartCard({ data }: any) {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 text-center">나의 제출 현황</h2>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry: any, index: number) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-4 mt-4">
                {data.map((entry: any) => (
                    <div key={entry.name} className="flex items-center gap-1.5 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-text-secondary">{entry.name}</span>
                        <span className="font-bold">{entry.value}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}
