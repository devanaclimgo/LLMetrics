import { Skeleton } from "../components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>

      {/* Chart + Insights */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-[280px] col-span-2 rounded-xl" />
        <Skeleton className="h-[280px] rounded-xl" />
      </div>

      {/* Table */}
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>
  )
}