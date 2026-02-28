"use client"

import { Pill, Bell, AlertTriangle, Activity, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { medications, todayReminders, emergencyEvents, dashboardMetrics } from "@/lib/mock-data"

const kpis = [
  {
    title: "Active Medications",
    value: medications.filter((m) => m.status === "active").length,
    description: "Currently prescribed",
    icon: Pill,
    trend: "stable",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Today's Reminders",
    value: todayReminders.filter((r) => r.status === "pending" || r.status === "upcoming").length,
    description: `${todayReminders.filter((r) => r.status === "taken").length} completed`,
    icon: Bell,
    trend: "up",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Health Alerts",
    value: 2,
    description: "Abnormal vitals this week",
    icon: AlertTriangle,
    trend: "down",
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Emergency Events",
    value: emergencyEvents.length,
    description: `${emergencyEvents.filter((e) => e.resolved).length} resolved`,
    icon: Activity,
    trend: "stable",
    color: "bg-destructive/10 text-destructive",
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                <p className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {kpi.trend === "up" && <TrendingUp className="size-3 text-success" />}
                  {kpi.trend === "down" && <TrendingDown className="size-3 text-success" />}
                  <span>{kpi.description}</span>
                </div>
              </div>
              <div className={`flex size-10 items-center justify-center rounded-lg ${kpi.color}`}>
                <kpi.icon className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
