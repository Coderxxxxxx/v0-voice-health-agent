"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HealthTrendsChart } from "@/components/dashboard/health-trends-chart"
import { healthLogs, healthTrendsData } from "@/lib/mock-data"
import { Heart, Droplets, Wind, Thermometer, TrendingUp, TrendingDown, Minus } from "lucide-react"

const latestVitals = healthTrendsData[healthTrendsData.length - 1]

const vitalCards = [
  {
    title: "Blood Pressure",
    value: `${latestVitals.systolic}/${latestVitals.diastolic}`,
    unit: "mmHg",
    status: latestVitals.systolic < 130 ? "Normal" : latestVitals.systolic < 140 ? "Elevated" : "High",
    icon: Heart,
    trend: latestVitals.systolic < healthTrendsData[healthTrendsData.length - 2].systolic ? "down" : "up",
  },
  {
    title: "Heart Rate",
    value: latestVitals.heartRate,
    unit: "BPM",
    status: latestVitals.heartRate >= 60 && latestVitals.heartRate <= 80 ? "Normal" : "Elevated",
    icon: Droplets,
    trend: "stable",
  },
  {
    title: "Oxygen Level",
    value: latestVitals.oxygen,
    unit: "%",
    status: latestVitals.oxygen >= 95 ? "Normal" : "Low",
    icon: Wind,
    trend: "stable",
  },
  {
    title: "Blood Sugar",
    value: latestVitals.sugar,
    unit: "mg/dL",
    status: latestVitals.sugar < 110 ? "Normal" : latestVitals.sugar < 125 ? "Elevated" : "High",
    icon: Thermometer,
    trend: latestVitals.sugar < healthTrendsData[healthTrendsData.length - 2].sugar ? "down" : "up",
  },
]

export function VitalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Health Vitals</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Continuous monitoring and vital sign tracking
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vitalCards.map((vital) => (
          <Card key={vital.title}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <vital.icon className="size-5" />
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    vital.status === "Normal"
                      ? "border-success/30 text-success"
                      : vital.status === "Elevated"
                        ? "border-warning/30 text-warning"
                        : "border-destructive/30 text-destructive"
                  }`}
                >
                  {vital.status}
                </Badge>
              </div>
              <p className="text-sm font-medium text-muted-foreground">{vital.title}</p>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-2xl font-bold text-foreground">{vital.value}</span>
                <span className="text-xs text-muted-foreground mb-1">{vital.unit}</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                {vital.trend === "up" && <TrendingUp className="size-3 text-destructive" />}
                {vital.trend === "down" && <TrendingDown className="size-3 text-success" />}
                {vital.trend === "stable" && <Minus className="size-3" />}
                <span>{vital.trend === "up" ? "Increasing" : vital.trend === "down" ? "Decreasing" : "Stable"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <HealthTrendsChart />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Health Logs</CardTitle>
          <CardDescription>Recent vital sign recordings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Pressure</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Oxygen</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-foreground">
                    {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </TableCell>
                  <TableCell>{log.value}</TableCell>
                  <TableCell>{log.heart_rate} BPM</TableCell>
                  <TableCell>{log.oxygen}%</TableCell>
                  <TableCell>{log.temp}&deg;F</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        log.status === "Normal"
                          ? "border-success/30 text-success"
                          : log.status === "Elevated"
                            ? "border-warning/30 text-warning"
                            : "border-destructive/30 text-destructive"
                      }`}
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
