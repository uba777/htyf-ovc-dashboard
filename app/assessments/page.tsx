"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Download,
  Trash2,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { useState } from "react"

// Mock assessment data
const assessmentsData = [
  {
    id: "ASS001",
    childId: "CH001",
    childName: "Sarah Michelle",
    childAge: 12,
    assessor: "Jennifer Adams",
    assessorAvatar: "/professional-avatar.png",
    completedDate: "2024-01-15",
    riskScore: 25,
    riskBand: "Low",
    riskColor: "bg-green-100 text-green-800 border-green-200",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    lastUpdated: "2 days ago",
    factors: {
      housingStability: 2,
      foodSecurity: 1,
      healthStatus: 2,
      schoolingConsistency: 1,
      caregiverAvailability: 2,
      exposureToHarm: 1,
    },
    summary: "Child shows stable living conditions with minimal risk factors.",
  },
  {
    id: "ASS002",
    childId: "CH002",
    childName: "Michael Johnson",
    childAge: 8,
    assessor: "David Rodriguez",
    assessorAvatar: "/professional-avatar.png",
    completedDate: "2024-01-14",
    riskScore: 78,
    riskBand: "High",
    riskColor: "bg-red-100 text-red-800 border-red-200",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    lastUpdated: "3 days ago",
    factors: {
      housingStability: 4,
      foodSecurity: 3,
      healthStatus: 3,
      schoolingConsistency: 4,
      caregiverAvailability: 4,
      exposureToHarm: 5,
    },
    summary: "Multiple significant risk factors identified requiring immediate intervention.",
  },
  {
    id: "ASS003",
    childId: "CH003",
    childName: "Emma Rodriguez",
    childAge: 15,
    assessor: "Jennifer Adams",
    assessorAvatar: "/professional-avatar.png",
    completedDate: "2024-01-13",
    riskScore: 45,
    riskBand: "Medium",
    riskColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    lastUpdated: "4 days ago",
    factors: {
      housingStability: 2,
      foodSecurity: 3,
      healthStatus: 2,
      schoolingConsistency: 3,
      caregiverAvailability: 3,
      exposureToHarm: 2,
    },
    summary: "Some risk factors present that require monitoring and potential intervention.",
  },
  {
    id: "ASS004",
    childId: "CH004",
    childName: "David Kim",
    childAge: 10,
    assessor: "Maria Santos",
    assessorAvatar: "/professional-avatar.png",
    completedDate: "2024-01-12",
    riskScore: 15,
    riskBand: "Low",
    riskColor: "bg-green-100 text-green-800 border-green-200",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    lastUpdated: "5 days ago",
    factors: {
      housingStability: 1,
      foodSecurity: 1,
      healthStatus: 1,
      schoolingConsistency: 2,
      caregiverAvailability: 1,
      exposureToHarm: 1,
    },
    summary: "Excellent stability across all assessment factors.",
  },
  {
    id: "ASS005",
    childId: "CH005",
    childName: "Aisha Patel",
    childAge: 14,
    assessor: "David Rodriguez",
    assessorAvatar: "/professional-avatar.png",
    completedDate: "2024-01-11",
    riskScore: 62,
    riskBand: "High",
    riskColor: "bg-red-100 text-red-800 border-red-200",
    status: "in-progress",
    statusColor: "bg-yellow-100 text-yellow-800",
    lastUpdated: "1 day ago",
    factors: {
      housingStability: 3,
      foodSecurity: 4,
      healthStatus: 2,
      schoolingConsistency: 4,
      caregiverAvailability: 3,
      exposureToHarm: 3,
    },
    summary: "Assessment in progress - multiple factors requiring attention identified.",
  },
  {
    id: "ASS006",
    childId: "CH006",
    childName: "Carlos Santos",
    childAge: 7,
    assessor: "Jennifer Adams",
    assessorAvatar: "/professional-avatar.png",
    completedDate: "2024-01-10",
    riskScore: 38,
    riskBand: "Medium",
    riskColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
    lastUpdated: "6 days ago",
    factors: {
      housingStability: 2,
      foodSecurity: 2,
      healthStatus: 3,
      schoolingConsistency: 2,
      caregiverAvailability: 2,
      exposureToHarm: 2,
    },
    summary: "Generally stable with some areas needing support and monitoring.",
  },
]

const riskBandStats = {
  Low: { count: 2, color: "bg-green-100 text-green-800 border-green-200" },
  Medium: { count: 2, color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  High: { count: 2, color: "bg-red-100 text-red-800 border-red-200" },
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState(assessmentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRisk, setFilterRisk] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const filteredAssessments = assessments
    .filter((assessment) => {
      const matchesSearch = 
        assessment.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.assessor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.id.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRisk = filterRisk === "all" || assessment.riskBand.toLowerCase() === filterRisk.toLowerCase()
      const matchesStatus = filterStatus === "all" || assessment.status === filterStatus
      
      return matchesSearch && matchesRisk && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
        case "risk":
          return b.riskScore - a.riskScore
        case "child":
          return a.childName.localeCompare(b.childName)
        case "assessor":
          return a.assessor.localeCompare(b.assessor)
        default:
          return 0
      }
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getRiskTrend = (score: number) => {
    if (score >= 60) return <TrendingUp className="h-4 w-4 text-red-600" />
    if (score <= 30) return <TrendingDown className="h-4 w-4 text-green-600" />
    return <Minus className="h-4 w-4 text-yellow-600" />
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Assessments</h1>
            <p className="text-muted-foreground">Manage child risk assessments and evaluations</p>
          </div>
          <Button asChild>
            <a href="/assessments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </a>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessments.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          
          {Object.entries(riskBandStats).map(([band, stats]) => (
            <Card key={band}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{band} Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.count}</div>
                <Badge className={`text-xs ${stats.color}`}>{band}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by child name, assessor, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="risk">Risk Score</SelectItem>
                  <SelectItem value="child">Child Name</SelectItem>
                  <SelectItem value="assessor">Assessor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Assessments List */}
        <div className="space-y-4">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={assessment.assessorAvatar} alt={assessment.assessor} />
                      <AvatarFallback>{assessment.assessor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{assessment.childName}</h3>
                        <Badge variant="outline">Age {assessment.childAge}</Badge>
                        <Badge className={`text-xs ${assessment.riskColor}`}>
                          {assessment.riskBand} Risk
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {assessment.assessor}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(assessment.completedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          {getRiskTrend(assessment.riskScore)}
                          Score: {assessment.riskScore}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-2xl">
                        {assessment.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${assessment.statusColor}`}>
                      {getStatusIcon(assessment.status)}
                      <span className="ml-1">{assessment.status.replace('-', ' ')}</span>
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Assessment
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Export Report
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Risk Factors Breakdown */}
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium mb-2">Risk Factors:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {Object.entries(assessment.factors).map(([factor, score]) => (
                      <div key={factor} className="text-xs">
                        <span className="text-muted-foreground">
                          {factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                        </span>
                        <span className={`ml-1 font-medium ${
                          score >= 4 ? 'text-red-600' : 
                          score >= 3 ? 'text-yellow-600' : 
                          'text-green-600'
                        }`}>
                          {score}/5
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAssessments.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No assessments found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || filterRisk !== "all" || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first assessment."}
              </p>
              <Button asChild>
                <a href="/assessments/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Assessment
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  )
}

