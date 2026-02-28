"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmergencyAnalytics } from "@/components/dashboard/emergency-analytics"
import { emergencyEvents, currentUser, doctor } from "@/lib/mock-data"
import { AlertTriangle, Phone, Shield, User, Stethoscope } from "lucide-react"

export function EmergencyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Emergency Alerts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Emergency detection, response history, and contact management
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Emergency Contact</p>
                <p className="text-xs text-muted-foreground">Primary contact</p>
              </div>
            </div>
            <p className="font-mono text-sm text-foreground">{currentUser.emergency_contact}</p>
            <Button variant="destructive" size="sm" className="w-full mt-3 gap-2">
              <Phone className="size-3.5" />
              Call Emergency
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Stethoscope className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{doctor.full_name}</p>
                <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
              </div>
            </div>
            <p className="font-mono text-sm text-foreground">{doctor.phone}</p>
            <Button variant="default" size="sm" className="w-full mt-3 gap-2">
              <Phone className="size-3.5" />
              Call Doctor
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <Shield className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">System Status</p>
                <p className="text-xs text-muted-foreground">Emergency detection</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-success" />
              <span className="text-sm font-medium text-foreground">Active & Monitoring</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Alert response time: &lt; 2 seconds
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-destructive" />
            <CardTitle className="text-base font-semibold">Emergency Event History</CardTitle>
          </div>
          <CardDescription>Past emergency events and resolution status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Triggered At</TableHead>
                <TableHead>Doctor Notified</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emergencyEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium text-foreground">{event.event_type}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        event.severity === "Critical"
                          ? "border-destructive/30 text-destructive"
                          : "border-warning/30 text-warning"
                      }`}
                    >
                      {event.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(event.triggered_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={event.doctor_notified ? "default" : "secondary"} className="text-[10px]">
                      {event.doctor_notified ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        event.resolved
                          ? "border-success/30 text-success"
                          : "border-destructive/30 text-destructive"
                      }`}
                    >
                      {event.resolved ? "Resolved" : "Active"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EmergencyAnalytics />
    </div>
  )
}
