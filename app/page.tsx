"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { MedicationsPage } from "@/components/pages/medications-page"
import { VitalsPage } from "@/components/pages/vitals-page"
import { VoicePage } from "@/components/pages/voice-page"
import { EmergencyPage } from "@/components/pages/emergency-page"
import { LogsPage } from "@/components/pages/logs-page"
import { PlanPage } from "@/components/pages/plan-page"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bell, Wifi } from "lucide-react"

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  medications: "Medications",
  vitals: "Health Vitals",
  voice: "Voice Assistant",
  emergency: "Emergency Alerts",
  logs: "Activity Logs",
  plan: "Medical Plan",
  settings: "Settings",
}

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard")

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />
      case "medications":
        return <MedicationsPage />
      case "vitals":
        return <VitalsPage />
      case "voice":
        return <VoicePage />
      case "emergency":
        return <EmergencyPage />
      case "logs":
        return <LogsPage />
      case "plan":
        return <PlanPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} onNavigate={setActivePage} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <nav className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">VitaVoice</span>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium text-foreground">{pageTitles[activePage]}</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Wifi className="size-3.5 text-success" />
                <span className="hidden sm:inline">Online</span>
              </div>
              <button className="relative" aria-label="Notifications">
                <Bell className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="absolute -top-1 -right-1 size-2 rounded-full bg-destructive" />
              </button>
              <Badge variant="outline" className="text-[10px] hidden sm:flex">
                Agent Active
              </Badge>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
