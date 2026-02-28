"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { adherenceData } from "@/lib/mock-data"

const COLORS = ["var(--color-chart-2)", "var(--color-chart-4)", "var(--color-chart-3)"]

export function AdherenceChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Medication Adherence</CardTitle>
        <CardDescription>Compliance rate this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adherenceData}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
              >
                {adherenceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: 13,
                }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">72%</span> overall adherence rate
        </div>
      </CardContent>
    </Card>
  )
}
