"use client"

import type React from "react"

import { useState } from "react"
import DashboardHeader from "@/components/DashboardHeader"
import Link from "next/link"
import { Home, Users, FileText, Settings } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <aside className={`bg-gray-100 w-64 flex-shrink-0 border-r ${sidebarOpen ? "block" : "hidden"} md:block`}>
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/teams" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200">
              <Users className="h-5 w-5" />
              <span>Teams</span>
            </Link>
            <Link href="/dashboard/surveys" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200">
              <FileText className="h-5 w-5" />
              <span>Surveys</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

