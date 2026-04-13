import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/v1";
const API_KEY = import.meta.env.API_KEY;

interface DashboardData {
  total_cost: number;
  total_requests: number;
  avg_cost: number;
  cost_by_feature: {
    feature: string;
    requests: number;
    total_cost: number;
    avg_cost: number;
  }[];
}

interface CostPoint {
  date: string;
  cost: number;
}

interface Insight {
  type: "warning" | "suggestion" | "info";
  message: string;
  value?: number;
}

export function useDashboardData() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [costOverTime, setCostOverTime] = useState<CostPoint[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          Authorization: `Bearer ${API_KEY}`,
        };

        const [dashboardRes, costRes, insightsRes] = await Promise.all([
          fetch(`${API_URL}/dashboard`, { headers }),
          fetch(`${API_URL}/cost_over_time`, { headers }),
          fetch(`${API_URL}/insights`, { headers }),
        ]);

        setDashboard(await dashboardRes.json());
        setCostOverTime(await costRes.json());
        setInsights(await insightsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 10000); // 10s

    return () => clearInterval(interval);
  }, []);

  return {
    dashboard,
    costOverTime,
    insights,
    loading,
  };
}
