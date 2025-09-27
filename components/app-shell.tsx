"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import {
  Menu,
  Plus,
  Bell,
  Settings,
  User,
  LogOut,
  Home,
  Users,
  FileText,
  Heart,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Children", href: "/children", icon: Users },
  { name: "Assessments", href: "/assessments", icon: FileText },
  { name: "Sponsors", href: "/sponsors", icon: Heart },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("flex h-full flex-col bg-sidebar border-r border-sidebar-border", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-center px-6 border-b border-sidebar-border">
        <Image
          src="/logo.png"
          alt="HTYF Logo"
          width={120}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <a href={item.href}>
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
              </a>
            </Button>
          )
        })}
      </nav>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>

            {/* Desktop Logo */}
            <div className="lg:hidden">
              <Image
                src="/logo.png"
                alt="HTYF Logo"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:space-x-6">
              {navigationItems.map((item) => (
                <Button key={item.name} variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                  <a href={item.href}>{item.name}</a>
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Global New Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  New Child
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  New Assessment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  New Case Note
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Document
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/professional-avatar.png" alt="User" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
