import { useState, useMemo } from "react";
import { OrderCard } from "@/components/OrderCard";
import { StationTabs } from "@/components/StationTabs";
import { StatsBar } from "@/components/StatsBar";
import { useOrders } from "@/hooks/useOrders";
import { mockStats } from "@/data/mockData";
import { Station } from "@/types/kds";
import { ChefHat, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

type StationFilter = Station | "all";

const KitchenDisplay = () => {
  const { orders, advanceOrder, dismissOrder } = useOrders();
  const [activeStation, setActiveStation] = useState<StationFilter>("all");

  const filteredOrders = useMemo(() => {
    const filtered = activeStation === "all"
      ? orders
      : orders.filter((o) => o.station === activeStation || o.items.some((i) => i.station === activeStation));

    // Sort: delayed first, then new, then preparing, then ready. Rush orders first within each group.
    const statusPriority = { delayed: 0, new: 1, preparing: 2, ready: 3 };
    return [...filtered].sort((a, b) => {
      const sp = statusPriority[a.status] - statusPriority[b.status];
      if (sp !== 0) return sp;
      if (a.priority !== b.priority) return a.priority === "rush" ? -1 : 1;
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }, [orders, activeStation]);

  const counts = useMemo(() => {
    const c: Record<StationFilter, number> = { all: orders.length, grill: 0, drinks: 0, desserts: 0, salads: 0 };
    orders.forEach((o) => {
      o.items.forEach((i) => {
        if (c[i.station] !== undefined) c[i.station]++;
      });
    });
    // Deduplicate by counting unique orders per station
    const stationOrders: Record<string, Set<string>> = { grill: new Set(), drinks: new Set(), desserts: new Set(), salads: new Set() };
    orders.forEach((o) => o.items.forEach((i) => stationOrders[i.station]?.add(o.id)));
    (["grill", "drinks", "desserts", "salads"] as Station[]).forEach((s) => { c[s] = stationOrders[s].size; });
    return c;
  }, [orders]);

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ChefHat className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Kitchen Display</h1>
            <p className="text-xs text-muted-foreground">Live order management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </div>
          <Link to="/analytics" className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Link>
        </div>
      </div>

      {/* Stats */}
      <StatsBar stats={{ ...mockStats, ordersActive: orders.length, ordersDelayed: orders.filter((o) => o.status === "delayed").length }} />

      {/* Station Tabs */}
      <StationTabs active={activeStation} onChange={setActiveStation} counts={counts} />

      {/* Order Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAdvance={advanceOrder}
            onDismiss={dismissOrder}
          />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <ChefHat className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-lg font-medium">No orders in this station</p>
          <p className="text-sm">Orders will appear here in real-time</p>
        </div>
      )}
    </div>
  );
};

export default KitchenDisplay;
