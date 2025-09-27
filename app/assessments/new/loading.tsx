import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewAssessmentLoading() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form Skeleton */}
          <div className="lg:col-span-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-96" />
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-12 w-16 mx-auto" />
                <Skeleton className="h-6 w-24 mx-auto" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
