import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("border-border/50 bg-card/50 backdrop-blur-sm", className)}>
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{title}</span>
            <span className="text-2xl font-semibold tracking-tight">{value}</span>
            {trend && (
              <span
                className={cn(
                  "text-xs",
                  trend.positive ? "text-success" : "text-destructive"
                )}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
