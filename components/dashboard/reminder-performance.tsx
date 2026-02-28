"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { reminderPerformance } from "@/lib/mock-data"

export function ReminderPerformance() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Reminder Performance</CardTitle>
        <CardDescription>Success rate of medication reminders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reminderPerformance} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: 13,
                }}
              />
              <Legend />
              <Bar dataKey="successful" fill="var(--color-chart-2)" name="Successful" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="missed" fill="var(--color-chart-3)" name="Missed" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="offline" fill="var(--color-chart-1)" name="Offline" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
