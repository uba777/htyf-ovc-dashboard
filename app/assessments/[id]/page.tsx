"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  MoreVertical,
  Edit,
  Download,
  Share,
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
  Eye,
  Printer,
} from "lucide-react"
import { useState } from "react"

// Mock detailed assessment data
const assessmentDetails = {
  id: "ASS001",
  childId: "CH001",
  childName: "Sarah Michelle",
  childAge: 12,
  childAvatar: "/professional-avatar.png",
  assessor: "Jennifer Adams",
  assessorAvatar: "/professional-avatar.png",
  assessorRole: "Senior Case Worker",
  completedDate: "2024-01-15",
  lastUpdated: "2024-01-15",
  riskScore: 25,
  riskBand: "Low",
  riskColor: "bg-green-100 text-green-800 border-green-200",
  status: "completed",
  statusColor: "bg-green-100 text-green-800",
  
  factors: {
    housingStability: {
      score: 2,
      description: "Mostly stable with minor concerns",
      details: "Child lives in a stable foster home with consistent caregivers. Minor concerns about neighborhood safety but overall housing situation is secure."
    },
    foodSecurity: {
      score: 1,
      description: "Consistent access to nutritious food",
      details: "Child has regular meals and access to healthy food options. No concerns about hunger or malnutrition."
    },
    healthStatus: {
      score: 2,
      description: "Good health with minor issues",
      details: "Child is generally healthy with regular medical check-ups. Minor seasonal allergies but no chronic conditions."
    },
    schoolingConsistency: {
      score: 1,
      description: "Regular attendance, good performance",
      details: "Child attends school regularly and performs well academically. Good relationships with teachers and peers."
    },
    caregiverAvailability: {
      score: 2,
      description: "Generally available with support",
      details: "Foster parents are generally attentive and available. Some support needed but overall care is adequate."
    },
    exposureToHarm: {
      score: 1,
      description: "Safe environment, no concerns",
      details: "Child is in a safe environment with no known exposure to violence, abuse, or other harmful situations."
    },
  },
  
  additionalNotes: "Sarah has shown significant improvement in her emotional regulation since placement with current foster family. She has developed strong relationships with her foster siblings and is participating well in family activities. Regular therapy sessions are helping her process past trauma. Overall, this is a stable placement with positive outcomes.",
  
  recommendations: [
    "Continue current foster placement - excellent fit",
    "Maintain regular therapy sessions for trauma processing",
    "Monitor school performance and social relationships",
    "Provide ongoing support to foster family",
    "Schedule follow-up assessment in 6 months"
  ],
  
  nextAssessmentDate: "2024-07-15",
  caseWorker: "Jennifer Adams",
  supervisor: "Maria Santos",
}

const factorDescriptions = {
  housingStability: "Assessment of the child's living situation, including stability, safety, and adequacy of housing",
  foodSecurity: "Evaluation of the child's access to adequate, nutritious food and food stability",
  healthStatus: "Review of the child's physical and mental health, including access to healthcare",
  schoolingConsistency: "Assessment of school attendance, academic performance, and educational stability",
  caregiverAvailability: "Evaluation of caregiver presence, attentiveness, and ability to meet child's needs",
  exposureToHarm: "Assessment of the child's exposure to violence, abuse, neglect, or other harmful situations"
}

export default function AssessmentDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [assessment] = useState(assessmentDetails)

  const getRiskTrend = (score: number) => {
    if (score >= 60) return <TrendingUp className="h-4 w-4 text-red-600" />
    if (score <= 30) return <TrendingDown className="h-4 w-4 text-green-600" />
    return <Minus className="h-4 w-4 text-yellow-600" />
  }

  const getFactorScoreColor = (score: number) => {
    if (score >= 4) return "text-red-600 bg-red-50 border-red-200"
    if (score >= 3) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-green-600 bg-green-50 border-green-200"
  }

  const getFactorScoreLabel = (score: number) => {
    if (score === 1) return "Excellent"
    if (score === 2) return "Good"
    if (score === 3) return "Fair"
    if (score === 4) return "Poor"
    if (score === 5) return "Critical"
    return "Not Assessed"
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/assessments">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Assessment #{assessment.id}
              </h1>
              <p className="text-muted-foreground">
                For: {assessment.childName} (Age {assessment.childAge})
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Share className="mr-2 h-4 w-4" />
                  Share Assessment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Assessment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Assessment Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Assessment Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Completed:</span>
                      <span>{new Date(assessment.completedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Assessor:</span>
                      <span>{assessment.assessor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{new Date(assessment.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={`text-xs ${assessment.statusColor}`}>
                        {assessment.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Factors</CardTitle>
                <CardDescription>
                  Detailed breakdown of each assessment factor with scores and explanations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(assessment.factors).map(([factor, data]) => (
                  <div key={factor} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">
                          {factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {factorDescriptions[factor as keyof typeof factorDescriptions]}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getFactorScoreColor(data.score)} border`}>
                          {data.score}/5 - {getFactorScoreLabel(data.score)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-sm">{data.description}</p>
                      <p className="text-sm text-muted-foreground">{data.details}</p>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{assessment.additionalNotes}</p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Action items and recommendations based on this assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessment.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-foreground">{assessment.riskScore}</div>
                  <Badge className={`text-sm ${assessment.riskColor}`}>
                    {assessment.riskBand} Risk
                  </Badge>
                  <div className="flex items-center justify-center space-x-1">
                    {getRiskTrend(assessment.riskScore)}
                    <span className="text-sm text-muted-foreground">Overall Risk Level</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Assessment Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    Child appears to be in a stable, safe environment with minimal risk factors. 
                    Current placement is working well and should be maintained.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Child Information */}
            <Card>
              <CardHeader>
                <CardTitle>Child Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={assessment.childAvatar} alt={assessment.childName} />
                    <AvatarFallback>{assessment.childName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{assessment.childName}</h4>
                    <p className="text-sm text-muted-foreground">Age {assessment.childAge}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/children/${assessment.childId}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Child Profile
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Assessment Team */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={assessment.assessorAvatar} alt={assessment.assessor} />
                    <AvatarFallback>{assessment.assessor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{assessment.assessor}</h4>
                    <p className="text-xs text-muted-foreground">{assessment.assessorRole}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Case Worker:</span>
                    <span>{assessment.caseWorker}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supervisor:</span>
                    <span>{assessment.supervisor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Next Assessment:</span>
                  </div>
                  <p className="text-sm font-medium">
                    {new Date(assessment.nextAssessmentDate).toLocaleDateString()}
                  </p>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
