"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { healthTrendsData } from "@/lib/mock-data"

export function HealthTrendsChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Health Trends</CardTitle>
        <CardDescription>Track your vitals over the past 2 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bp" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
            <TabsTrigger value="heart">Heart Rate</TabsTrigger>
            <TabsTrigger value="sugar">Sugar Level</TabsTrigger>
          </TabsList>
          <TabsContent value="bp">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendsData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 12 }} domain={[60, 170]} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: 13,
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Systolic"
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Diastolic"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="heart">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendsData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 12 }} domain={[50, 100]} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: 13,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="var(--color-chart-3)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Heart Rate (BPM)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="sugar">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendsData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 12 }} domain={[80, 150]} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      fontSize: 13,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sugar"
                    stroke="var(--color-chart-4)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Sugar Level (mg/dL)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
