"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Plus,
  Eye,
  MapPin,
  Calendar,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { useState } from "react"

const childrenData = [
  {
    id: "CH001",
    name: "Sarah Michelle",
    age: 12,
    location: "California",
    riskBand: "low",
    schoolingStatus: "enrolled",
    tags: ["Medical Care", "Educational Support"],
    updatedAt: "2 days ago",
    avatar: "SM",
  },
  {
    id: "CH002",
    name: "Michael Johnson",
    age: 8,
    location: "Texas",
    riskBand: "high",
    schoolingStatus: "not-enrolled",
    tags: ["Family Reunification", "Urgent Care"],
    updatedAt: "1 day ago",
    avatar: "MJ",
  },
  {
    id: "CH003",
    name: "Emma Rodriguez",
    age: 15,
    location: "Florida",
    riskBand: "medium",
    schoolingStatus: "enrolled",
    tags: ["Vocational Training", "Counseling"],
    updatedAt: "3 hours ago",
    avatar: "ER",
  },
  {
    id: "CH004",
    name: "David Kim",
    age: 10,
    location: "New York",
    riskBand: "low",
    schoolingStatus: "enrolled",
    tags: ["Sponsor Match", "Health Check"],
    updatedAt: "5 days ago",
    avatar: "DK",
  },
  {
    id: "CH005",
    name: "Aisha Patel",
    age: 14,
    location: "California",
    riskBand: "medium",
    schoolingStatus: "homeschooled",
    tags: ["Language Support", "Cultural Integration"],
    updatedAt: "1 week ago",
    avatar: "AP",
  },
  {
    id: "CH006",
    name: "Carlos Santos",
    age: 7,
    location: "Arizona",
    riskBand: "high",
    schoolingStatus: "not-enrolled",
    tags: ["Emergency Placement", "Medical Care"],
    updatedAt: "6 hours ago",
    avatar: "CS",
  },
]

const getRiskBadge = (risk: string) => {
  const variants = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  }
  return variants[risk as keyof typeof variants] || variants.low
}

const getSchoolingIcon = (status: string) => {
  switch (status) {
    case "enrolled":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "not-enrolled":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "homeschooled":
      return <Clock className="h-4 w-4 text-blue-600" />
    default:
      return <GraduationCap className="h-4 w-4 text-gray-600" />
  }
}

export default function ChildrenPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [schoolingFilter, setSchoolingFilter] = useState("all")
  const [ageRange, setAgeRange] = useState([0, 18])

  const filteredChildren = childrenData.filter((child) => {
    const matchesSearch =
      child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      child.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || child.location === locationFilter
    const matchesRisk = riskFilter === "all" || child.riskBand === riskFilter
    const matchesSchooling = schoolingFilter === "all" || child.schoolingStatus === schoolingFilter
    const matchesAge = child.age >= ageRange[0] && child.age <= ageRange[1]

    return matchesSearch && matchesLocation && matchesRisk && matchesSchooling && matchesAge
  })

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Children</h1>
            <p className="text-muted-foreground">Manage and monitor children in the OVC program</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredChildren.length} of {childrenData.length} children
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

            {/* Filter Controls */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location (State)</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="California">California</SelectItem>
                    <SelectItem value="Texas">Texas</SelectItem>
                    <SelectItem value="Florida">Florida</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Arizona">Arizona</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="risk">Risk Band</Label>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All risk levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schooling">Schooling Status</Label>
                <Select value={schoolingFilter} onValueChange={setSchoolingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="enrolled">Enrolled</SelectItem>
                    <SelectItem value="not-enrolled">Not Enrolled</SelectItem>
                    <SelectItem value="homeschooled">Homeschooled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">
                  Age Range: {ageRange[0]} - {ageRange[1]}
                </Label>
                <Slider value={ageRange} onValueChange={setAgeRange} max={18} min={0} step={1} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children Cards */}
        <div className="grid gap-4">
          {filteredChildren.map((child) => (
            <Card key={child.id} className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-sm font-medium text-secondary-foreground">{child.avatar}</span>
                    </div>

                    {/* Child Info */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-foreground">{child.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {child.id}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {child.age} years old
                        </span>
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {child.location}
                        </span>
                        <span className="flex items-center">
                          {getSchoolingIcon(child.schoolingStatus)}
                          <span className="ml-1 capitalize">{child.schoolingStatus.replace("-", " ")}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags and Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {child.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Badge className={`text-xs ${getRiskBadge(child.riskBand)}`}>
                      {child.riskBand.charAt(0).toUpperCase() + child.riskBand.slice(1)} Risk
                    </Badge>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Updated {child.updatedAt}</span>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredChildren.length === 0 && (
          <Card className="rounded-xl shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">No children found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms to find children.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating New Child Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add new child</span>
      </Button>
    </AppShell>
  )
}
