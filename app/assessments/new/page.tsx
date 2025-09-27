"use client"

import type React from "react"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Sparkles, AlertTriangle } from "lucide-react"
import { useState } from "react"

interface AssessmentData {
  childId?: string
  childName?: string
  housingStability: string
  foodSecurity: string
  healthStatus: string
  schoolingConsistency: string
  caregiverAvailability: string
  exposureToHarm: string
  additionalNotes: string
}

const initialAssessment: AssessmentData = {
  housingStability: "",
  foodSecurity: "",
  healthStatus: "",
  schoolingConsistency: "",
  caregiverAvailability: "",
  exposureToHarm: "",
  additionalNotes: "",
}

// Risk scoring weights (out of 100 total points)
const riskWeights = {
  housingStability: 20,
  foodSecurity: 15,
  healthStatus: 15,
  schoolingConsistency: 15,
  caregiverAvailability: 20,
  exposureToHarm: 15,
}

// Risk level mappings (1-5 scale, where 5 is highest risk)
const riskLevels = {
  "1": 0, // No risk
  "2": 25, // Low risk
  "3": 50, // Moderate risk
  "4": 75, // High risk
  "5": 100, // Critical risk
}

const getRiskBand = (score: number): { band: string; color: string; description: string } => {
  if (score <= 30) {
    return {
      band: "Low",
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Child appears to be in a stable, safe environment with minimal risk factors.",
    }
  } else if (score <= 60) {
    return {
      band: "Medium",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      description: "Some risk factors present that require monitoring and potential intervention.",
    }
  } else {
    return {
      band: "High",
      color: "bg-red-100 text-red-800 border-red-200",
      description: "Multiple significant risk factors present requiring immediate attention and intervention.",
    }
  }
}

const calculateRiskScore = (assessment: AssessmentData): number => {
  const factors = [
    "housingStability",
    "foodSecurity",
    "healthStatus",
    "schoolingConsistency",
    "caregiverAvailability",
    "exposureToHarm",
  ] as const

  let totalScore = 0
  let validFactors = 0

  factors.forEach((factor) => {
    const value = assessment[factor]
    if (value && value !== "") {
      const riskLevel = riskLevels[value as keyof typeof riskLevels]
      const weight = riskWeights[factor]
      totalScore += (riskLevel / 100) * weight
      validFactors++
    }
  })

  // Only return score if we have at least 4 factors assessed
  return validFactors >= 4 ? Math.round(totalScore) : 0
}

export default function NewAssessmentPage({
  searchParams,
}: {
  searchParams: { childId?: string; childName?: string }
}) {
  const [assessment, setAssessment] = useState<AssessmentData>({
    ...initialAssessment,
    childId: searchParams.childId,
    childName: searchParams.childName,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isGeneratingJustification, setIsGeneratingJustification] = useState(false)
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null)

  const updateAssessment = (field: keyof AssessmentData, value: string) => {
    setAssessment((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    try {
      const response = await fetch("/api/ai/check-availability")
      const { available } = await response.json()
      setAiAvailable(available)
    } catch (error) {
      console.error("Failed to check AI availability:", error)
      setAiAvailable(false)
    }
  }

  const handleGenerateJustification = async () => {
    setIsGeneratingJustification(true)
    try {
      const response = await fetch("/api/ai/generate-justification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessment,
          riskScore: calculateRiskScore(assessment),
          riskBand: getRiskBand(calculateRiskScore(assessment)).band,
        }),
      })

      if (response.ok) {
        const { justification } = await response.json()
        alert(`AI Justification Generated:\n\n${justification}`)
      } else {
        throw new Error("Failed to generate justification")
      }
    } catch (error) {
      console.error("Error generating justification:", error)
      alert("Failed to generate AI justification. Please try again.")
    } finally {
      setIsGeneratingJustification(false)
    }
  }

  const riskScore = calculateRiskScore(assessment)
  const riskInfo = getRiskBand(riskScore)
  const canCalculateRisk = Object.values(assessment).filter((v) => v && v !== "").length >= 4

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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">New Assessment</h1>
              {assessment.childName && (
                <p className="text-muted-foreground">
                  For: {assessment.childName} {assessment.childId && `(ID: ${assessment.childId})`}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Assessment Form */}
          <div className="lg:col-span-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Risk Assessment Factors</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Rate each factor on a scale of 1-5, where 1 is no concern and 5 is critical concern.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Housing Stability */}
                  <div className="space-y-2">
                    <Label htmlFor="housing">Housing Stability</Label>
                    <Select
                      value={assessment.housingStability}
                      onValueChange={(value) => updateAssessment("housingStability", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select housing stability level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Stable permanent housing</SelectItem>
                        <SelectItem value="2">2 - Mostly stable with minor concerns</SelectItem>
                        <SelectItem value="3">3 - Temporary or uncertain housing</SelectItem>
                        <SelectItem value="4">4 - Frequent housing changes</SelectItem>
                        <SelectItem value="5">5 - Homeless or unsafe housing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Food Security */}
                  <div className="space-y-2">
                    <Label htmlFor="food">Food Security</Label>
                    <Select
                      value={assessment.foodSecurity}
                      onValueChange={(value) => updateAssessment("foodSecurity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select food security level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Consistent access to nutritious food</SelectItem>
                        <SelectItem value="2">2 - Generally adequate with occasional gaps</SelectItem>
                        <SelectItem value="3">3 - Inconsistent access to adequate food</SelectItem>
                        <SelectItem value="4">4 - Frequent food insecurity</SelectItem>
                        <SelectItem value="5">5 - Severe malnutrition or hunger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Health Status */}
                  <div className="space-y-2">
                    <Label htmlFor="health">Health Status</Label>
                    <Select
                      value={assessment.healthStatus}
                      onValueChange={(value) => updateAssessment("healthStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select health status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Excellent health, regular care</SelectItem>
                        <SelectItem value="2">2 - Good health with minor issues</SelectItem>
                        <SelectItem value="3">3 - Some health concerns or gaps in care</SelectItem>
                        <SelectItem value="4">4 - Significant health issues</SelectItem>
                        <SelectItem value="5">5 - Critical health problems or no access to care</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Schooling Consistency */}
                  <div className="space-y-2">
                    <Label htmlFor="schooling">Schooling Consistency</Label>
                    <Select
                      value={assessment.schoolingConsistency}
                      onValueChange={(value) => updateAssessment("schoolingConsistency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select schooling consistency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Regular attendance, good performance</SelectItem>
                        <SelectItem value="2">2 - Generally consistent with minor issues</SelectItem>
                        <SelectItem value="3">3 - Irregular attendance or performance</SelectItem>
                        <SelectItem value="4">4 - Frequent absences or poor performance</SelectItem>
                        <SelectItem value="5">5 - Not attending school or severe issues</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Caregiver Availability */}
                  <div className="space-y-2">
                    <Label htmlFor="caregiver">Caregiver Availability</Label>
                    <Select
                      value={assessment.caregiverAvailability}
                      onValueChange={(value) => updateAssessment("caregiverAvailability", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select caregiver availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Consistent, attentive caregiving</SelectItem>
                        <SelectItem value="2">2 - Generally available with support</SelectItem>
                        <SelectItem value="3">3 - Limited availability or capacity</SelectItem>
                        <SelectItem value="4">4 - Inconsistent or inadequate care</SelectItem>
                        <SelectItem value="5">5 - No consistent caregiver or neglect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Exposure to Harm */}
                  <div className="space-y-2">
                    <Label htmlFor="harm">Exposure to Harm</Label>
                    <Select
                      value={assessment.exposureToHarm}
                      onValueChange={(value) => updateAssessment("exposureToHarm", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exposure to harm level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Safe environment, no concerns</SelectItem>
                        <SelectItem value="2">2 - Minimal risk factors present</SelectItem>
                        <SelectItem value="3">3 - Some exposure to risk or violence</SelectItem>
                        <SelectItem value="4">4 - Regular exposure to harmful situations</SelectItem>
                        <SelectItem value="5">5 - Immediate danger or severe abuse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Provide any additional context, observations, or concerns..."
                      value={assessment.additionalNotes}
                      onChange={(e) => updateAssessment("additionalNotes", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button type="submit" disabled={!canCalculateRisk}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Assessment
                    </Button>

                    {isSubmitted && aiAvailable === true && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGenerateJustification}
                        disabled={isGeneratingJustification}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isGeneratingJustification ? "Generating..." : "Generate AI Justification"}
                      </Button>
                    )}

                    {isSubmitted && aiAvailable === false && (
                      <Button type="button" variant="outline" disabled>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate AI Justification
                        <span className="ml-2 text-xs">(AI Unavailable)</span>
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Risk Score Display */}
          <div className="space-y-6">
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {canCalculateRisk ? (
                  <>
                    <div className="text-center space-y-3">
                      <div className="text-3xl font-bold text-foreground">{riskScore}</div>
                      <Badge className={`text-sm ${riskInfo.color}`}>{riskInfo.band} Risk</Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Assessment Summary</h4>
                      <p className="text-sm text-muted-foreground">{riskInfo.description}</p>
                    </div>

                    {riskScore > 60 && (
                      <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-red-800">High Risk Alert</p>
                          <p className="text-red-700">Immediate intervention may be required.</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-muted-foreground">--</div>
                    <p className="text-sm text-muted-foreground">Complete at least 4 factors to calculate risk score</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assessment Progress */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Factors Completed</span>
                    <span>{Object.values(assessment).filter((v) => v && v !== "").length - 2}/6</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((Object.values(assessment).filter((v) => v && v !== "").length - 2) / 6) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
