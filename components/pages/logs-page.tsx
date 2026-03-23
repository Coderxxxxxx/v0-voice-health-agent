"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { voiceInteractionLogs, healthLogs } from "@/lib/mock-data"
import { Mic, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Activity Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete history of voice interactions and health recordings
        </p>
      </div>

      <Tabs defaultValue="voice" className="w-full">
        <TabsList>
          <TabsTrigger value="voice" className="gap-1.5">
            <Mic className="size-3.5" />
            Voice Logs
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-1.5">
            <FileText className="size-3.5" />
            Health Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Voice Activity Logs</CardTitle>
              <CardDescription>All user commands and system responses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Waqt</TableHead>
                    <TableHead className="w-[80px]">Qism</TableHead>
                    <TableHead>User Command</TableHead>
                    <TableHead>System Response</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {voiceInteractionLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs text-foreground">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${log.type === "reminder"
                            ? "border-primary/30 text-primary"
                            : log.type === "confirmation"
                              ? "border-success/30 text-success"
                              : log.type === "query"
                                ? "border-chart-4/30 text-chart-4"
                                : log.type === "log"
                                  ? "border-chart-1/30 text-chart-1"
                                  : "border-muted-foreground/30 text-muted-foreground"
                            }`}
                        >
                          {log.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-foreground">{log.command}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.response}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Health Recording History</CardTitle>
              <CardDescription>Complete vital sign measurement log</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Oxygen</TableHead>
                    <TableHead>Temp</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium text-foreground">
                        {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                      <TableCell>{log.value}</TableCell>
                      <TableCell>{log.heart_rate} BPM</TableCell>
                      <TableCell>{log.oxygen}%</TableCell>
                      <TableCell>{log.temp}&deg;F</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${log.status === "Normal"
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
