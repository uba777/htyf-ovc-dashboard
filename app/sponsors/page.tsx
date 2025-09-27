"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, Heart, Users, CheckCircle, Clock, AlertCircle, MapPin, Calendar, Target } from "lucide-react"
import { useState } from "react"

const sponsorsData = [
  {
    id: "SP001",
    name: "Johnson Family Foundation",
    capacity: 5,
    activeMatches: 3,
    status: "active",
    preferences: ["Education", "Healthcare", "Ages 8-12"],
    location: "California",
    joinedDate: "2023-01-15",
    avatar: "JF",
  },
  {
    id: "SP002",
    name: "Maria Rodriguez",
    capacity: 2,
    activeMatches: 2,
    status: "full",
    preferences: ["Girls Only", "Educational Support", "Ages 13-17"],
    location: "Texas",
    joinedDate: "2023-03-22",
    avatar: "MR",
  },
  {
    id: "SP003",
    name: "Tech for Good Corp",
    capacity: 10,
    activeMatches: 7,
    status: "active",
    preferences: ["STEM Education", "Technology Access", "Ages 10-18"],
    location: "New York",
    joinedDate: "2022-11-08",
    avatar: "TG",
  },
  {
    id: "SP004",
    name: "Community Care Network",
    capacity: 8,
    activeMatches: 0,
    status: "pending",
    preferences: ["Medical Care", "Emergency Support", "All Ages"],
    location: "Florida",
    joinedDate: "2024-01-10",
    avatar: "CC",
  },
  {
    id: "SP005",
    name: "Sarah & David Kim",
    capacity: 3,
    activeMatches: 1,
    status: "active",
    preferences: ["Language Support", "Cultural Integration", "Ages 5-15"],
    location: "California",
    joinedDate: "2023-07-14",
    avatar: "SK",
  },
]

const childrenData = [
  {
    id: "CH001",
    name: "Sarah Michelle",
    age: 12,
    needs: ["Educational Support", "Medical Care"],
    location: "California",
    avatar: "SM",
  },
  {
    id: "CH002",
    name: "Michael Johnson",
    age: 8,
    needs: ["Family Reunification", "Urgent Care"],
    location: "Texas",
    avatar: "MJ",
  },
  {
    id: "CH003",
    name: "Emma Rodriguez",
    age: 15,
    needs: ["Vocational Training", "Counseling"],
    location: "Florida",
    avatar: "ER",
  },
  {
    id: "CH004",
    name: "David Kim",
    age: 10,
    needs: ["STEM Education", "Technology Access"],
    location: "New York",
    avatar: "DK",
  },
]

const getStatusBadge = (status: string) => {
  const variants = {
    active: "bg-green-100 text-green-800 border-green-200",
    full: "bg-yellow-100 text-yellow-800 border-yellow-200",
    pending: "bg-blue-100 text-blue-800 border-blue-200",
    inactive: "bg-gray-100 text-gray-800 border-gray-200",
  }
  return variants[status as keyof typeof variants] || variants.active
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "full":
      return <Users className="h-4 w-4 text-yellow-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "inactive":
      return <AlertCircle className="h-4 w-4 text-gray-600" />
    default:
      return <CheckCircle className="h-4 w-4 text-green-600" />
  }
}

const calculateMatchScore = (child: any, sponsor: any) => {
  let score = 0

  // Location match (30 points)
  if (child.location === sponsor.location) score += 30

  // Age preference match (25 points)
  const agePrefs = sponsor.preferences.filter((pref: string) => pref.includes("Ages"))
  if (agePrefs.length > 0) {
    const ageRange = agePrefs[0].match(/\d+/g)
    if (ageRange && child.age >= Number.parseInt(ageRange[0]) && child.age <= Number.parseInt(ageRange[1])) {
      score += 25
    }
  }

  // Need/preference overlap (35 points)
  const needMatches = child.needs.filter((need: string) =>
    sponsor.preferences.some((pref: string) => pref.includes(need) || need.includes(pref)),
  )
  score += Math.min(needMatches.length * 15, 35)

  // Capacity availability (10 points)
  if (sponsor.activeMatches < sponsor.capacity) score += 10

  return Math.min(score, 100)
}

export default function SponsorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedChild, setSelectedChild] = useState<any>(null)
  const [matchDrawerOpen, setMatchDrawerOpen] = useState(false)

  const filteredSponsors = sponsorsData.filter((sponsor) => {
    const matchesSearch =
      sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sponsor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getTopMatches = (child: any) => {
    return sponsorsData
      .map((sponsor) => ({
        ...sponsor,
        matchScore: calculateMatchScore(child, sponsor),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sponsors</h1>
            <p className="text-muted-foreground">Manage sponsor relationships and find matches for children</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">{filteredSponsors.length} sponsors</div>
            <Sheet open={matchDrawerOpen} onOpenChange={setMatchDrawerOpen}>
              <SheetTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  <Target className="mr-2 h-4 w-4" />
                  Find Matches
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[600px] sm:w-[800px]">
                <SheetHeader>
                  <SheetTitle>Find Sponsor Matches</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Child Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Select a child to find matches:</Label>
                    <div className="grid gap-3">
                      {childrenData.map((child) => (
                        <Card
                          key={child.id}
                          className={`cursor-pointer transition-colors ${
                            selectedChild?.id === child.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedChild(child)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{child.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium">{child.name}</h4>
                                  <Badge variant="outline">{child.age} years</Badge>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {child.location}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {child.needs.map((need, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {need}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Match Results */}
                  {selectedChild && (
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Top 5 sponsor matches for {selectedChild.name}:</Label>
                      <div className="space-y-3">
                        {getTopMatches(selectedChild).map((sponsor, index) => (
                          <Card key={sponsor.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-primary">#{index + 1}</span>
                                    <Avatar className="h-10 w-10">
                                      <AvatarFallback>{sponsor.avatar}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{sponsor.name}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                      <span className="flex items-center">
                                        <MapPin className="mr-1 h-3 w-3" />
                                        {sponsor.location}
                                      </span>
                                      <span className="flex items-center">
                                        <Users className="mr-1 h-3 w-3" />
                                        {sponsor.activeMatches}/{sponsor.capacity} capacity
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                      <span className="text-sm font-medium">Match Score:</span>
                                      <Progress value={sponsor.matchScore} className="w-24 h-2" />
                                      <span className="text-sm font-medium text-primary">{sponsor.matchScore}%</span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  disabled={sponsor.status === "full" || sponsor.status === "inactive"}
                                  className="bg-primary text-primary-foreground"
                                >
                                  <Heart className="mr-1 h-3 w-3" />
                                  Assign Match
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="full">At Capacity</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sponsors Table */}
        <div className="grid gap-4">
          {filteredSponsors.map((sponsor) => (
            <Card key={sponsor.id} className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {sponsor.avatar}
                      </AvatarFallback>
                    </Avatar>

                    {/* Sponsor Info */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-foreground">{sponsor.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {sponsor.id}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {sponsor.activeMatches}/{sponsor.capacity} capacity
                        </span>
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {sponsor.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Joined {new Date(sponsor.joinedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Preferences, Status, and Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {sponsor.preferences.map((preference, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {preference}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(sponsor.status)}
                      <Badge className={`text-xs ${getStatusBadge(sponsor.status)}`}>
                        {sponsor.status.charAt(0).toUpperCase() + sponsor.status.slice(1)}
                      </Badge>
                    </div>

                    <Button size="sm" variant="outline">
                      <Heart className="mr-1 h-3 w-3" />
                      View Profile
                    </Button>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacity Usage</span>
                    <span className="font-medium">
                      {sponsor.activeMatches} of {sponsor.capacity} children
                    </span>
                  </div>
                  <Progress value={(sponsor.activeMatches / sponsor.capacity) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSponsors.length === 0 && (
          <Card className="rounded-xl shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">No sponsors found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms to find sponsors.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  )
}
