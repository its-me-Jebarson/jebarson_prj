import { mockHourlyData, mockTrendData, mockStats } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, Clock, AlertTriangle, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/" className="rounded-lg p-2 hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Analytics</h1>
          <p className="text-xs text-muted-foreground">Kitchen performance insights</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Avg Prep Time", value: `${mockStats.avgPrepTime}m`, icon: Clock, color: "text-primary", delta: "-0.8m" },
          { label: "Orders Today", value: "147", icon: TrendingUp, color: "text-kds-ready", delta: "+12%" },
          { label: "Delayed Orders", value: "3", icon: AlertTriangle, color: "text-kds-delayed", delta: "-25%" },
          { label: "Efficiency", value: `${mockStats.efficiency}%`, icon: Zap, color: "text-accent", delta: "+3%" },
        ].map((card) => (
          <div key={card.label} className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <card.icon className={`h-5 w-5 ${card.color}`} />
              <span className="text-xs font-medium text-kds-ready">{card.delta}</span>
            </div>
            <div className="font-mono text-2xl font-bold text-foreground">{card.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Hourly Orders */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Orders by Hour</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockHourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 22%)" />
              <XAxis dataKey="hour" tick={{ fill: "hsl(215 12% 55%)", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215 12% 55%)", fontSize: 11 }} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220 18% 14%)", border: "1px solid hsl(220 14% 22%)", borderRadius: 8, color: "hsl(210 20% 92%)" }}
              />
              <Bar dataKey="orders" fill="hsl(210 100% 56%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Avg Prep Time */}
        <div className="rounded-lg bg-card border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Avg Prep Time by Hour</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mockHourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 22%)" />
              <XAxis dataKey="hour" tick={{ fill: "hsl(215 12% 55%)", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215 12% 55%)", fontSize: 11 }} axisLine={false} unit="m" />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220 18% 14%)", border: "1px solid hsl(220 14% 22%)", borderRadius: 8, color: "hsl(210 20% 92%)" }}
              />
              <Area type="monotone" dataKey="avgTime" stroke="hsl(36 100% 55%)" fill="hsl(36 100% 55% / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Trend */}
        <div className="rounded-lg bg-card border border-border p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Order Trends</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={mockTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 22%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(215 12% 55%)", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215 12% 55%)", fontSize: 11 }} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220 18% 14%)", border: "1px solid hsl(220 14% 22%)", borderRadius: 8, color: "hsl(210 20% 92%)" }}
              />
              <Line type="monotone" dataKey="orders" stroke="hsl(210 100% 56%)" strokeWidth={2} dot={{ fill: "hsl(210 100% 56%)" }} />
              <Line type="monotone" dataKey="delayed" stroke="hsl(0 72% 55%)" strokeWidth={2} dot={{ fill: "hsl(0 72% 55%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
