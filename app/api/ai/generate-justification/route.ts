import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { assessment, riskScore, riskBand } = await request.json()

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "AI service not configured" }, { status: 503 })
    }

    // Mock AI justification generation
    // In a real implementation, this would call the OpenAI API
    const justification = `Based on the assessment data:

Risk Score: ${riskScore} (${riskBand} Risk)

Key Factors:
- Housing Stability: ${getFactorDescription(assessment.housingStability, "housing")}
- Food Security: ${getFactorDescription(assessment.foodSecurity, "food")}
- Health Status: ${getFactorDescription(assessment.healthStatus, "health")}
- Schooling: ${getFactorDescription(assessment.schoolingConsistency, "schooling")}
- Caregiver Availability: ${getFactorDescription(assessment.caregiverAvailability, "caregiver")}
- Exposure to Harm: ${getFactorDescription(assessment.exposureToHarm, "harm")}

Recommendation: ${getRiskRecommendation(riskScore)}

${assessment.additionalNotes ? `Additional Context: ${assessment.additionalNotes}` : ""}`

    return NextResponse.json({ justification })
  } catch (error) {
    console.error("Error generating justification:", error)
    return NextResponse.json({ error: "Failed to generate justification" }, { status: 500 })
  }
}

function getFactorDescription(level: string, type: string): string {
  const descriptions = {
    housing: [
      "Stable permanent housing",
      "Mostly stable",
      "Temporary/uncertain",
      "Frequent changes",
      "Homeless/unsafe",
    ],
    food: [
      "Consistent nutritious access",
      "Generally adequate",
      "Inconsistent access",
      "Frequent insecurity",
      "Severe malnutrition",
    ],
    health: ["Excellent health", "Good with minor issues", "Some concerns", "Significant issues", "Critical problems"],
    schooling: [
      "Regular attendance",
      "Generally consistent",
      "Irregular patterns",
      "Frequent absences",
      "Not attending",
    ],
    caregiver: [
      "Consistent care",
      "Generally available",
      "Limited availability",
      "Inconsistent care",
      "No consistent caregiver",
    ],
    harm: ["Safe environment", "Minimal risk", "Some exposure", "Regular exposure", "Immediate danger"],
  }

  const index = Number.parseInt(level) - 1
  return descriptions[type as keyof typeof descriptions]?.[index] || "Not assessed"
}

function getRiskRecommendation(score: number): string {
  if (score <= 30) {
    return "Continue regular monitoring and support services. Maintain current interventions."
  } else if (score <= 60) {
    return "Increase monitoring frequency and consider additional support services. Address identified risk factors."
  } else {
    return "Immediate intervention required. Consider emergency services and comprehensive safety planning."
  }
}
