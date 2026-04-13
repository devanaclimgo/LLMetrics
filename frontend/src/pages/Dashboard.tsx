import { DashboardHeader } from "../components/dashboard-header";
import { StatCard } from "../components/stat-card";
import { CostChart } from "../components/cost-chart";
import { FeatureTable } from "../components/feature-table";
import { InsightsPanel } from "../components/insights-panel";
import { DollarSign, Activity, TrendingDown } from "lucide-react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { DashboardSkeleton } from "./DashboardSkeleton";

export default function Dashboard() {
  const { dashboard, costOverTime, insights, loading } = useDashboardData();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />

      <main className="flex-1 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          {/* Stats Row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Cost (Today)"
              value={`$${dashboard?.total_cost?.toFixed(2) || "0.00"}`}
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: "5% vs yesterday", positive: true }}
            />
            <StatCard
              title="Total Requests"
              value={dashboard?.total_requests?.toLocaleString() || "0"}
              icon={<Activity className="h-5 w-5" />}
              trend={{ value: "8% vs yesterday", positive: true }}
            />
            <StatCard
              title="Avg Cost per Request"
              value={`$${dashboard?.avg_cost?.toFixed(3) || "0.000"}`}
              icon={<TrendingDown className="h-5 w-5" />}
              trend={{ value: "3% vs yesterday", positive: true }}
            />
          </div>

          {/* Chart and Insights Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CostChart data={costOverTime} />
            </div>
            <div>
              <InsightsPanel insights={insights} />
            </div>
          </div>

          {/* Feature Table */}
          <FeatureTable data={dashboard} />
        </div>
      </main>

      <footer className="border-t border-border/50 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-muted-foreground">
          <span>LLMetrics v1.0.0</span>
          <span>Last updated: 2 minutes ago</span>
        </div>
      </footer>
    </div>
  );
}
