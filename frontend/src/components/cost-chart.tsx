import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  ValueType,
  NameType,
  Formatter,
} from "recharts/types/component/DefaultTooltipContent";

interface CostChartProps {
  data: {
    date: string;
    cost: number;
  }[];
}

export function CostChart({ data }: CostChartProps) {
  const myFormatter: Formatter<ValueType, NameType> = (value, name) => {
    return [value?.toString() ?? "", name?.toString() ?? ""];
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Cost Over Time</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.65 0.2 250)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.65 0.2 250)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="date" />

              <YAxis tickFormatter={(value) => `$${value}`} />

              <Tooltip
                formatter={myFormatter}
              />

              <Area
                type="monotone"
                dataKey="cost"
                stroke="oklch(0.65 0.2 250)"
                fill="url(#colorCost)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
