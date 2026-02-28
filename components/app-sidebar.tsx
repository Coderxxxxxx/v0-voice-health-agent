"use client"

import {
  LayoutDashboard,
  Pill,
  Activity,
  AlertTriangle,
  Mic,
  FileText,
  User,
  Heart,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { currentUser } from "@/lib/mock-data"

const mainNav = [
  { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { title: "Medications", icon: Pill, id: "medications", badge: "5" },
  { title: "Health Vitals", icon: Activity, id: "vitals" },
  { title: "Voice Assistant", icon: Mic, id: "voice" },
]

const monitorNav = [
  { title: "Emergency Alerts", icon: AlertTriangle, id: "emergency", badge: "2" },
  { title: "Health Logs", icon: FileText, id: "logs" },
  { title: "Medical Plan", icon: Heart, id: "plan" },
]

interface AppSidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

export function AppSidebar({ activePage, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Heart className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm">VitaVoice</span>
            <span className="text-xs text-sidebar-foreground/60">Health Agent</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activePage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.title}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {monitorNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activePage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.title}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" onClick={() => onNavigate("settings")}>
              <Settings className="size-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={currentUser.full_name} size="lg">
              <Avatar className="size-6">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-sm font-medium">{currentUser.full_name}</span>
                <span className="text-xs text-sidebar-foreground/60">Patient</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
