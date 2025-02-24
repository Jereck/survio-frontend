"use client"

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, PieChart } from "@/components/Charts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpRight, Users, FileText, Activity, TrendingUp, Crown, AlertCircle } from "lucide-react"

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

interface Subscription {
  subscription_plan: string
  team_members_used: number
  team_members_allowed: number
}

export default function DashboardPage() {
  const { user, token } = useAuthStore()
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!token) {
      router.push("/login")
      return
    }

    const fetchData = async () => {
      try {
        const [subRes, teamsRes, surveysRes] = await Promise.all([
          fetch("http://localhost:5000/users/subscription", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/teams", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/surveys", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        if (!subRes.ok || !teamsRes.ok || !surveysRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const [subData, teamsData, surveysData] = await Promise.all([subRes.json(), teamsRes.json(), surveysRes.json()])

        setSubscription(subData)
        setTeams(teamsData)
        setSurveys(surveysData)
      } catch (err) {
        setError("Failed to load dashboard data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, router])

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-destructive/10">
          <CardContent className="flex items-center space-x-2 pt-6">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const membershipProgress = subscription
    ? (subscription.team_members_used / subscription.team_members_allowed) * 100
    : 0

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=50&width=50" alt={user?.email} />
              <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.username}</h1>
              <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your surveys today.</p>
            </div>
          </div>
        </div>
        <Card className="w-full md:w-auto">
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <Crown className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg capitalize">{subscription?.subscription_plan || "Free"} Plan</CardTitle>
              <CardDescription>Team member usage</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{subscription?.team_members_used} used</span>
                <span>{subscription?.team_members_allowed} total</span>
              </div>
              <Progress value={membershipProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveys.length}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="secondary" className="mr-1">
                +2
              </Badge>
              from last month
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveys.reduce((acc, survey) => acc + survey.responses, 0)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="secondary" className="mr-1">
                +20%
              </Badge>
              from last month
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="secondary" className="mr-1">
                +1
              </Badge>
              new team this week
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(surveys.reduce((acc, survey) => acc + survey.completionRate, 0) / surveys.length)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="secondary" className="mr-1">
                +5%
              </Badge>
              from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="surveys">Surveys</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Survey Responses Over Time</CardTitle>
                <CardDescription>Track your survey engagement trends</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Response Distribution</CardTitle>
                <CardDescription>Survey completion breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="surveys" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Surveys</CardTitle>
                <CardDescription>Monitor your active surveys and their performance</CardDescription>
              </div>
              <Button>Create Survey</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {surveys.map((survey) => (
                  <div key={survey.id} className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{survey.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{survey.title}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{survey.responses} responses</Badge>
                        <Badge variant="outline">{survey.completionRate}% completion</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Teams</CardTitle>
                <CardDescription>Manage your team members and their access</CardDescription>
              </div>
              <Button>Create Team</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{team.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{team.members} members</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage Team
                    </Button>
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

