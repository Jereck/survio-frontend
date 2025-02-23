"use client"

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, PieChart } from "@/components/Charts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRight, Users, FileText, Activity, TrendingUp } from "lucide-react"

interface Team {
  id: string
  name: string
  members: number
}

interface Survey {
  id: string
  title: string
  responses: number
  completionRate: number
}

export default function DashboardPage() {
  const { user, token } = useAuthStore()
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([])
  const [surveys, setSurveys] = useState<Survey[]>([])

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }
  }, [token, router])

  useEffect(() => {
    // Mock data fetching
    setTeams([
      { id: "1", name: "Product Team", members: 8 },
      { id: "2", name: "Marketing Team", members: 5 },
      { id: "3", name: "Development Team", members: 12 },
    ])
    setSurveys([
      { id: "1", title: "User Satisfaction Survey", responses: 243, completionRate: 78 },
      { id: "2", title: "Feature Request Survey", responses: 156, completionRate: 62 },
      { id: "3", title: "Customer Feedback Survey", responses: 389, completionRate: 85 },
    ])
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.email}</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your surveys today.</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=50&width=50" alt={user?.email} />
          <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveys.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveys.reduce((acc, survey) => acc + survey.responses, 0)}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">+1 new team this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(surveys.reduce((acc, survey) => acc + survey.completionRate, 0) / surveys.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Survey Responses Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Response Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="surveys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {surveys.map((survey) => (
                  <div key={survey.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{survey.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{survey.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {survey.responses} responses • {survey.completionRate}% completion rate
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Button variant="ghost">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{team.name}</p>
                      <p className="text-sm text-muted-foreground">{team.members} members</p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Button variant="outline">Manage Team</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

