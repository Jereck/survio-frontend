import { BarChart2, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { logout } = useAuthStore()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center mx-10">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link href="/dashboard" className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6" />
          <span className="font-bold text-xl">Survur.io</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline">Profile</Button>
          <Button onClick={logout} variant="ghost">Logout</Button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader

