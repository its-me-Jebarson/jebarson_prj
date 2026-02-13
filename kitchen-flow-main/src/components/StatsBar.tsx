import { KitchenStats as KitchenStatsType } from "@/types/kds";
import { Clock, CheckCircle, AlertTriangle, Activity, TrendingUp, Zap, DollarSign } from "lucide-react";

interface StatsBarProps {
  stats: KitchenStatsType;
}

export function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { label: "Today's Income", value: `$${stats.todayIncome.toLocaleString()}`, icon: DollarSign, color: "text-kds-ready" },
    { label: "Avg Prep", value: `${stats.avgPrepTime}m`, icon: Clock, color: "text-primary" },
    { label: "Completed", value: stats.ordersCompleted.toString(), icon: CheckCircle, color: "text-kds-ready" },
    { label: "Active", value: stats.ordersActive.toString(), icon: Activity, color: "text-kds-preparing" },
    { label: "Delayed", value: stats.ordersDelayed.toString(), icon: AlertTriangle, color: "text-kds-delayed" },
    { label: "Peak", value: stats.peakHour, icon: TrendingUp, color: "text-accent" },
    { label: "Efficiency", value: `${stats.efficiency}%`, icon: Zap, color: "text-kds-ready" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 lg:grid-cols-7">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg bg-card border border-border p-3 text-center">
          <item.icon className={`mx-auto mb-1 h-4 w-4 ${item.color}`} />
          <div className="font-mono text-lg font-bold text-foreground">{item.value}</div>
          <div className="text-xs text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
