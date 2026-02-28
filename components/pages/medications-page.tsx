"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { medications, todayReminders } from "@/lib/mock-data"
import { AdherenceChart } from "@/components/dashboard/adherence-chart"
import { ReminderCards } from "@/components/dashboard/reminder-cards"
import { Pill, Clock, Calendar, Plus } from "lucide-react"

export function MedicationsPage() {
  const totalDays = (med: typeof medications[0]) => {
    const start = new Date(med.start_date)
    const end = new Date(med.end_date)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const elapsedDays = (med: typeof medications[0]) => {
    const start = new Date(med.start_date)
    const now = new Date()
    return Math.min(Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)), totalDays(med))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Medications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage prescriptions and track medication schedules
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          Add Medication
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {medications.map((med) => {
          const progress = Math.round((elapsedDays(med) / totalDays(med)) * 100)
          return (
            <Card key={med.id} className="relative overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Pill className="size-5" />
                  </div>
                  <Badge variant="outline" className="border-success/30 text-success text-[10px]">
                    Active
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground">{med.medicine_name}</h3>
                <p className="text-sm text-muted-foreground">{med.dosage} - {med.frequency}</p>

                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    <span>{med.time_slots.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    <span>
                      {new Date(med.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                      {new Date(med.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-muted-foreground">Course progress</span>
                    <span className="text-[11px] font-medium text-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ReminderCards />
        <AdherenceChart />
      </div>
    </div>
  )
}
