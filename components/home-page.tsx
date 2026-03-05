'use client'

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
import { SettingsPage } from "@/components/pages/settings-page"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bell, Wifi, Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"

export function HomePage() {
  const [activePage, setActivePage] = useState("dashboard")
  const { theme, toggleTheme } = useTheme()
  const { t, language, setLanguage, isRTL } = useI18n()

  const pageTitles: Record<string, string> = {
    dashboard: t('dashboard'),
    medications: t('medications'),
    vitals: t('vitals'),
    voice: t('voice'),
    emergency: t('emergency'),
    logs: t('logs'),
    plan: t('plan'),
    settings: t('settings'),
  }

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
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} onNavigate={setActivePage} />
      <SidebarInset>
        <header className={`flex h-14 shrink-0 items-center gap-2 border-b px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <SidebarTrigger className={isRTL ? "mr-1" : "-ml-1"} />
          <Separator orientation="vertical" className={`${isRTL ? 'ml-2' : 'mr-2'} h-4`} />
          <div className="flex flex-1 items-center justify-between">
            <nav className={`flex items-center gap-1.5 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-muted-foreground">{t('vitaVoice')}</span>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium text-foreground">{pageTitles[activePage]}</span>
            </nav>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1.5 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Wifi className="size-3.5 text-success" />
                <span className="hidden sm:inline">{t('online')}</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 h-auto"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )}
              </Button>
              
              <div className="hidden sm:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const langs: Array<'en' | 'ur-roman' | 'ur-rtl'> = ['en', 'ur-roman', 'ur-rtl']
                    const currentIndex = langs.indexOf(language)
                    const nextIndex = (currentIndex + 1) % langs.length
                    setLanguage(langs[nextIndex])
                  }}
                  className="p-2 h-auto text-xs"
                  title="Click to change language"
                >
                  <Globe className="size-4 mr-1" />
                  {language === 'en' ? 'EN' : language === 'ur-roman' ? 'اردو' : 'UR'}
                </Button>
              </div>

              <button className="relative" aria-label={t('notifications')}>
                <Bell className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="absolute -top-1 -right-1 size-2 rounded-full bg-destructive" />
              </button>
              <Badge variant="outline" className="text-[10px] hidden sm:flex">
                {t('agentActive')}
              </Badge>
            </div>
          </div>
        </header>
        <main className={`flex-1 overflow-auto p-4 md:p-6 ${isRTL ? 'rtl' : 'ltr'}`}>
          {renderPage()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
