"use client"

import { KpiCards } from "@/components/dashboard/kpi-cards"
import { HealthTrendsChart } from "@/components/dashboard/health-trends-chart"
import { AdherenceChart } from "@/components/dashboard/adherence-chart"
import { ReminderCards } from "@/components/dashboard/reminder-cards"
import { EmergencyAnalytics } from "@/components/dashboard/emergency-analytics"
import { ReminderPerformance } from "@/components/dashboard/reminder-performance"
import { SystemMetrics } from "@/components/dashboard/system-metrics"

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time health monitoring and medication tracking
        </p>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HealthTrendsChart />
        </div>
        <div>
          <AdherenceChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReminderCards />
        </div>
        <div>
          <SystemMetrics />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EmergencyAnalytics />
        <ReminderPerformance />
      </div>
    </div>
  )
}
