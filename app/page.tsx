import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Heart, AlertTriangle, Clock, CheckCircle, AlertCircle, Calendar, User } from "lucide-react"
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const kpiData = [
  {
    title: "Active Children",
    value: "1,247",
    change: "+12 from last month",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "High-Risk Cases",
    value: "89",
    change: "3 new this week",
    changeType: "warning",
    icon: AlertTriangle,
  },
  {
    title: "Pending Alerts",
    value: "8",
    change: "Requires attention",
    changeType: "negative",
    icon: AlertCircle,
  },
  {
    title: "Sponsor Matches",
    value: "456",
    change: "+23 from last month",
    changeType: "positive",
    icon: Heart,
  },
]

const recentAlerts = [
  {
    id: 1,
    child: "Sarah M.",
    reason: "Missed scheduled visit",
    status: "urgent",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    child: "Michael K.",
    reason: "Health concern reported",
    status: "high",
    createdAt: "4 hours ago",
  },
  {
    id: 3,
    child: "Emma L.",
    reason: "Educational support needed",
    status: "medium",
    createdAt: "1 day ago",
  },
  {
    id: 4,
    child: "David R.",
    reason: "Family contact update",
    status: "low",
    createdAt: "2 days ago",
  },
]

const todayTasks = [
  {
    id: 1,
    task: "Monthly review for John D.",
    due: "Today 2:00 PM",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    task: "Sponsor meeting preparation",
    due: "Today 4:30 PM",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    task: "Case file updates - Maria S.",
    due: "Today 5:00 PM",
    priority: "Low",
    completed: true,
  },
  {
    id: 4,
    task: "Follow-up call with foster family",
    due: "Today 3:15 PM",
    priority: "High",
    completed: false,
  },
]

const riskDistribution = [
  { name: "Low Risk", value: 758, color: "#22c55e" },
  { name: "Medium Risk", value: 400, color: "#f59e0b" },
  { name: "High Risk", value: 89, color: "#ef4444" },
]

const getStatusBadge = (status: string) => {
  const variants = {
    urgent: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  }
  return variants[status as keyof typeof variants] || variants.low
}

export default function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the HTYF OVC Child Management System</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <Card key={index} className="rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                  <Icon
                    className={`h-4 w-4 ${
                      kpi.changeType === "negative" ? "text-destructive" : "text-muted-foreground"
                    }`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                  <p
                    className={`text-xs ${
                      kpi.changeType === "positive"
                        ? "text-green-600"
                        : kpi.changeType === "warning"
                          ? "text-orange-600"
                          : "text-destructive"
                    }`}
                  >
                    {kpi.change}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Alerts Table */}
          <Card className="rounded-xl shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Alerts</CardTitle>
              <CardDescription>Latest alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between space-x-4 p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{alert.child}</p>
                        <p className="text-xs text-muted-foreground">{alert.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={`text-xs ${getStatusBadge(alert.status)}`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{alert.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution Chart */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Risk Distribution</CardTitle>
              <CardDescription>Current risk level breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-sm text-muted-foreground">Risk Distribution Chart</div>
                  <div className="space-y-2">
                    {riskDistribution.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm">{entry.name}: {entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks for Today */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Tasks for Today</CardTitle>
            <CardDescription>Your caseworker todos and priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between space-x-4 p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-3">
                    {task.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="space-y-1">
                      <p
                        className={`text-sm font-medium ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {task.task}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {task.due}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={`text-xs ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      {task.priority}
                    </Badge>
                    {!task.completed && (
                      <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                        Mark Done
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
