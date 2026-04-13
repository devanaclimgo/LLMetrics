import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useDashboardData } from "@/hooks/use-dashboard-data"

interface FeatureTableProps {
  data: {
    cost_by_feature: {
      feature: string
      requests: number
      total_cost: number
      avg_cost: number
    }[]
  } | null
}

export function FeatureTable({ data }: FeatureTableProps) {
  const { } = useDashboardData()

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Custo por Funcionalidade</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Funcionalidade</TableHead>
              <TableHead className="text-muted-foreground text-right">Requisições</TableHead>
              <TableHead className="text-muted-foreground text-right">Custo Total</TableHead>
              <TableHead className="text-muted-foreground text-right">Custo Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.cost_by_feature?.map((item) => (
              <TableRow key={item.feature} className="border-border/50">
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium capitalize">{item.feature}</span>
                    <code className="text-xs text-muted-foreground font-mono">
                      {item.feature}
                    </code>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="font-mono">
                    {item.requests.toLocaleString()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${item.total_cost.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  ${item.avg_cost.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
