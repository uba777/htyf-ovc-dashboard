import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SponsorsLoading() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Filters Card Skeleton */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Sponsor Cards Skeleton */}
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-2 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
