import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardData } from "@/hooks/use-dashboard-data";

const iconMap = {
  warning: AlertTriangle,
  suggestion: Lightbulb,
  info: Info,
};

const colorMap = {
  warning: "text-warning",
  suggestion: "text-primary",
  info: "text-muted-foreground",
};

interface Insight {
  type: "warning" | "suggestion" | "info";
  message: string;
  value?: number;
}

interface InsightsPanelProps {
  insights: Insight[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const {} = useDashboardData();

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.type as keyof typeof iconMap];
          const colorClass = colorMap[insight.type as keyof typeof colorMap];

          return (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3"
            >
              <div className={cn("mt-0.5", colorClass)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{insight.message}</span>
                {insight.value && (
                  <span className="text-xs text-muted-foreground">
                    Value: {insight.value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
