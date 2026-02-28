"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Timer } from "lucide-react"
import { todayReminders } from "@/lib/mock-data"
import { toast } from "sonner"

export function ReminderCards() {
  const [reminders, setReminders] = useState(todayReminders)

  const handleConfirm = (id: number) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "taken", takenAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }
          : r
      )
    )
    const reminder = reminders.find((r) => r.id === id)
    toast.success(`${reminder?.medicine} marked as taken`)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Today's Reminders</CardTitle>
            <CardDescription>
              {reminders.filter((r) => r.status === "taken").length} of {reminders.length} completed
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
              reminder.status === "taken"
                ? "border-success/20 bg-success/5"
                : reminder.status === "pending"
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex size-8 items-center justify-center rounded-full ${
                  reminder.status === "taken"
                    ? "bg-success text-success-foreground"
                    : reminder.status === "pending"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {reminder.status === "taken" ? (
                  <Check className="size-4" />
                ) : reminder.status === "pending" ? (
                  <Clock className="size-4" />
                ) : (
                  <Timer className="size-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{reminder.medicine}</p>
                <p className="text-xs text-muted-foreground">
                  {reminder.status === "taken"
                    ? `Taken at ${reminder.takenAt}`
                    : `Scheduled: ${reminder.time}`}
                </p>
              </div>
            </div>
            {reminder.status === "pending" && (
              <Button size="sm" onClick={() => handleConfirm(reminder.id)} className="h-7 text-xs">
                Confirm
              </Button>
            )}
            {reminder.status === "taken" && (
              <Badge variant="outline" className="text-xs border-success/30 text-success">
                Done
              </Badge>
            )}
            {reminder.status === "upcoming" && (
              <Badge variant="outline" className="text-xs">
                Upcoming
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
