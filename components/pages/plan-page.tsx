"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { diagnosis, doctor, currentUser } from "@/lib/mock-data"
import {
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  FileText,
  User,
  Calendar,
  Hospital,
} from "lucide-react"

export function PlanPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Medical Plan</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personalized health plan based on doctor diagnosis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                <CardTitle className="text-base font-semibold">Diagnosis</CardTitle>
              </div>
              <CardDescription>
                Created on {new Date(diagnosis.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-secondary/50 p-4">
                <p className="text-sm leading-relaxed text-foreground">{diagnosis.diagnosis_text}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="size-4 text-accent" />
                <CardTitle className="text-base font-semibold">Diet Plan</CardTitle>
              </div>
              <CardDescription>Nutritional guidelines for your condition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {diagnosis.diet_plan.split(". ").filter(Boolean).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-semibold mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{item.trim().replace(/\.$/, "")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Dumbbell className="size-4 text-chart-4" />
                <CardTitle className="text-base font-semibold">Health Routine</CardTitle>
              </div>
              <CardDescription>Daily wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {diagnosis.routine_plan.split(". ").filter(Boolean).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-chart-4/10 text-chart-4 text-xs font-semibold mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{item.trim().replace(/\.$/, "")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="size-4 text-primary" />
                <CardTitle className="text-base font-semibold">Patient Info</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium text-foreground">{currentUser.full_name}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Age</span>
                <span className="text-sm font-medium text-foreground">{currentUser.age}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gender</span>
                <span className="text-sm font-medium text-foreground">{currentUser.gender}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm font-medium text-foreground">{currentUser.phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="size-4 text-primary" />
                <CardTitle className="text-base font-semibold">Doctor Info</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium text-foreground">{doctor.full_name}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Specialty</span>
                <Badge variant="secondary" className="text-xs">{doctor.specialization}</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hospital</span>
                <span className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Hospital className="size-3" />
                  {doctor.hospital}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Contact</span>
                <span className="text-sm font-medium text-foreground">{doctor.phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                <CardTitle className="text-base font-semibold">Upcoming</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-lg border bg-primary/5 border-primary/20 p-3">
                <p className="text-sm font-medium text-foreground">Follow-up Checkup</p>
                <p className="text-xs text-muted-foreground mt-1">March 5, 2026 - 10:00 AM</p>
                <p className="text-xs text-muted-foreground">Dr. Harrison - Cardiology</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium text-foreground">Blood Work</p>
                <p className="text-xs text-muted-foreground mt-1">March 12, 2026 - 8:00 AM</p>
                <p className="text-xs text-muted-foreground">Lab Services</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
