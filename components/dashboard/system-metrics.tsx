"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { dashboardMetrics } from "@/lib/mock-data"
import { Zap, Target, AlertCircle, Wifi, Shield } from "lucide-react"

const metrics = [
  {
    label: "Avg Response Time",
    value: dashboardMetrics.avgResponseTime,
    icon: Zap,
    progress: 85,
  },
  {
    label: "Reminder Success",
    value: dashboardMetrics.reminderSuccessRate,
    icon: Target,
    progress: 92,
  },
  {
    label: "Emergency Freq",
    value: dashboardMetrics.emergencyTriggerFreq,
    icon: AlertCircle,
    progress: 30,
  },
  {
    label: "Offline Alerts",
    value: dashboardMetrics.offlineAlertSuccess,
    icon: Wifi,
    progress: 98,
  },
  {
    label: "Stability Score",
    value: `${dashboardMetrics.healthStabilityScore}/100`,
    icon: Shield,
    progress: dashboardMetrics.healthStabilityScore,
  },
]

export function SystemMetrics() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">System Performance</CardTitle>
        <CardDescription>Real-time agent metrics</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              <metric.icon className="size-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
                <span className="text-xs font-semibold text-foreground">{metric.value}</span>
              </div>
              <Progress value={metric.progress} className="h-1.5" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
