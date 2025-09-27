"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
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
  MapPin,
  Calendar,
  Phone,
  Mail,
  FileText,
  Upload,
  Plus,
  Eye,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  GraduationCap,
  Heart,
  Bell,
} from "lucide-react"
import { useState } from "react"

// Mock data for the child profile
const childData = {
  id: "CH001",
  name: "Sarah Michelle",
  age: 12,
  dateOfBirth: "2012-03-15",
  gender: "Female",
  riskBand: "low",
  avatar: "SM",
  guardian: {
    name: "Maria Santos",
    relationship: "Foster Mother",
    phone: "+1 (555) 123-4567",
    email: "maria.santos@email.com",
  },
  location: {
    address: "123 Oak Street, Sacramento, CA 95814",
    coordinates: { lat: 38.5816, lng: -121.4944 },
  },
  tags: ["Medical Care", "Educational Support", "Sponsor Match"],
  lastUpdated: "2 days ago",
  caseWorker: "Jennifer Adams",
}

const caseNotes = [
  {
    id: 1,
    author: "Jennifer Adams",
    date: "2024-01-15",
    time: "2:30 PM",
    type: "Assessment",
    content:
      "Completed quarterly assessment. Sarah shows excellent progress in school and has adapted well to her foster placement. Recommend continued educational support.",
  },
  {
    id: 2,
    author: "Dr. Michael Chen",
    date: "2024-01-10",
    time: "10:15 AM",
    type: "Medical",
    content:
      "Annual health checkup completed. All vaccinations up to date. Minor vision correction needed - glasses prescribed.",
  },
  {
    id: 3,
    author: "Jennifer Adams",
    date: "2024-01-05",
    time: "4:45 PM",
    type: "Home Visit",
    content:
      "Conducted home visit with foster family. Positive environment observed. Sarah appears happy and well-cared for. Foster mother reports good behavior and academic performance.",
  },
]

const documents = [
  {
    id: 1,
    name: "Birth Certificate",
    type: "PDF",
    size: "245 KB",
    uploadDate: "2024-01-01",
    ocrText: "Certificate of Live Birth - Sarah Michelle - Born March 15, 2012 - Sacramento County, California",
  },
  {
    id: 2,
    name: "Medical Records",
    type: "PDF",
    size: "1.2 MB",
    uploadDate: "2024-01-10",
    ocrText:
      "Patient: Sarah Michelle - DOB: 03/15/2012 - Annual Physical Examination - Height: 4'8\" - Weight: 85 lbs - Vision: 20/40 (corrected) - All immunizations current",
  },
  {
    id: 3,
    name: "School Report Card",
    type: "PDF",
    size: "180 KB",
    uploadDate: "2024-01-12",
    ocrText:
      "Lincoln Elementary School - Grade 6 - Student: Sarah Michelle - Math: A-, English: A, Science: B+, Social Studies: A-, Art: A",
  },
  {
    id: 4,
    name: "Foster Care Agreement",
    type: "PDF",
    size: "890 KB",
    uploadDate: "2023-12-15",
    ocrText:
      "Foster Care Placement Agreement - Child: Sarah Michelle - Foster Family: Santos Family - Placement Date: December 15, 2023",
  },
]

const educationData = {
  attendance: 94,
  currentGrade: "6th Grade",
  school: "Lincoln Elementary School",
  termScores: [
    { subject: "Mathematics", q1: 88, q2: 92, q3: 89, current: 91 },
    { subject: "English Language Arts", q1: 95, q2: 93, q3: 96, current: 94 },
    { subject: "Science", q1: 82, q2: 85, q3: 87, current: 86 },
    { subject: "Social Studies", q1: 90, q2: 88, q3: 92, current: 90 },
    { subject: "Art", q1: 96, q2: 98, q3: 95, current: 97 },
  ],
  predictiveFlags: [
    { type: "positive", message: "Strong academic trajectory - likely to maintain high performance" },
    { type: "neutral", message: "Attendance slightly below optimal - monitor for patterns" },
  ],
}

const getRiskBadge = (risk: string) => {
  const variants = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  }
  return variants[risk as keyof typeof variants] || variants.low
}

const getTrendIcon = (current: number, previous: number) => {
  if (current > previous) return <TrendingUp className="h-3 w-3 text-green-600" />
  if (current < previous) return <TrendingDown className="h-3 w-3 text-red-600" />
  return <Minus className="h-3 w-3 text-gray-600" />
}

export default function ChildProfilePage({ params }: { params: { id: string } }) {
  const [selectedDocument, setSelectedDocument] = useState(documents[0])

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/children">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{childData.name}</h1>
              <p className="text-muted-foreground">
                Child ID: {childData.id} • Case Worker: {childData.caseWorker}
              </p>
            </div>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                New Assessment
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Add Case Note
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Create Alert
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="case-notes">Case Notes</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Basic Information */}
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" alt={childData.name} />
                      <AvatarFallback className="text-lg">{childData.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{childData.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {childData.age} years old • {childData.gender}
                      </p>
                      <Badge className={`text-xs ${getRiskBadge(childData.riskBand)}`}>
                        {childData.riskBand.charAt(0).toUpperCase() + childData.riskBand.slice(1)} Risk
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Born {childData.dateOfBirth}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {childData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guardian Information */}
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Guardian Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">{childData.guardian.name}</h4>
                      <p className="text-sm text-muted-foreground">{childData.guardian.relationship}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{childData.guardian.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{childData.guardian.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <p>{childData.location.address}</p>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Interactive Map</p>
                      <p className="text-xs">Sacramento, CA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Schedule Assessment
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Users className="mr-2 h-4 w-4" />
                    Contact Guardian
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Heart className="mr-2 h-4 w-4" />
                    Find Sponsor Match
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    School Coordination
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Case Notes Tab */}
          <TabsContent value="case-notes" className="space-y-6">
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Case Notes Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseNotes.map((note, index) => (
                    <div key={note.id} className="relative">
                      {index !== caseNotes.length - 1 && (
                        <div className="absolute left-4 top-8 h-full w-px bg-border" />
                      )}
                      <div className="flex space-x-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {note.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{note.author}</h4>
                              <Badge variant="outline" className="text-xs">
                                {note.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {note.date} at {note.time}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{note.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Documents Grid */}
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedDocument.id === doc.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium text-sm">{doc.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {doc.type} • {doc.size}
                            </p>
                            <p className="text-xs text-muted-foreground">Uploaded {doc.uploadDate}</p>
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* OCR Text Preview */}
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Document Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium text-sm mb-2">{selectedDocument.name}</h4>
                      <div className="h-32 bg-background border rounded flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <FileText className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">Document Preview</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Extracted Text (OCR)</h5>
                      <div className="p-3 bg-muted rounded-lg text-sm">{selectedDocument.ocrText}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Attendance & Overview */}
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Academic Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance Rate</span>
                      <span className="font-medium">{educationData.attendance}%</span>
                    </div>
                    <Progress value={educationData.attendance} className="h-2" />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Grade</span>
                      <span className="font-medium">{educationData.currentGrade}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>School</span>
                      <span className="font-medium">{educationData.school}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Flags */}
              <Card className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Predictive Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {educationData.predictiveFlags.map((flag, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${
                          flag.type === "positive"
                            ? "bg-green-500"
                            : flag.type === "negative"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <p className="text-sm text-muted-foreground">{flag.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Term Scores Table */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Term Scores & Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Subject</th>
                        <th className="text-center py-2">Q1</th>
                        <th className="text-center py-2">Q2</th>
                        <th className="text-center py-2">Q3</th>
                        <th className="text-center py-2">Current</th>
                        <th className="text-center py-2">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {educationData.termScores.map((score, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 font-medium">{score.subject}</td>
                          <td className="text-center py-2">{score.q1}</td>
                          <td className="text-center py-2">{score.q2}</td>
                          <td className="text-center py-2">{score.q3}</td>
                          <td className="text-center py-2 font-medium">{score.current}</td>
                          <td className="text-center py-2">{getTrendIcon(score.current, score.q3)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
