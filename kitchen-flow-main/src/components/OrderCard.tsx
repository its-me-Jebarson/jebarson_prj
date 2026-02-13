import { Order, OrderStatus } from "@/types/kds";
import { useTimer } from "@/hooks/useTimer";
import { Clock, ChevronRight, AlertTriangle, Utensils, Package, Truck, CheckCircle } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onAdvance: (id: string) => void;
  onDismiss: (id: string) => void;
}

const statusConfig: Record<OrderStatus, { label: string; glowClass: string; borderClass: string; bgClass: string; textClass: string }> = {
  new: { label: "NEW", glowClass: "kds-glow-new", borderClass: "border-kds-new", bgClass: "bg-kds-new/10", textClass: "text-kds-new" },
  preparing: { label: "PREPARING", glowClass: "kds-glow-preparing", borderClass: "border-kds-preparing", bgClass: "bg-kds-preparing/10", textClass: "text-kds-preparing" },
  ready: { label: "READY", glowClass: "kds-glow-ready", borderClass: "border-kds-ready", bgClass: "bg-kds-ready/10", textClass: "text-kds-ready" },
  delayed: { label: "DELAYED", glowClass: "kds-glow-delayed", borderClass: "border-kds-delayed", bgClass: "bg-kds-delayed/10", textClass: "text-kds-delayed" },
};

const typeIcons = {
  "dine-in": Utensils,
  takeout: Package,
  delivery: Truck,
};

export function OrderCard({ order, onAdvance, onDismiss }: OrderCardProps) {
  const elapsed = useTimer(order.createdAt);
  const config = statusConfig[order.status];
  const TypeIcon = typeIcons[order.type];

  return (
    <div
      className={`kds-card-enter rounded-lg border-2 ${config.borderClass} ${config.glowClass} bg-card p-4 transition-all duration-200 hover:scale-[1.01] ${order.status !== "ready" ? "cursor-pointer" : ""}`}
      onClick={() => order.status !== "ready" && onAdvance(order.id)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold text-foreground">{order.orderNumber}</span>
          {order.priority === "rush" && (
            <span className="flex items-center gap-1 rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-bold text-destructive">
              <AlertTriangle className="h-3 w-3" /> RUSH
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${config.bgClass} ${config.textClass}`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Customer & Timer */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <TypeIcon className="h-3.5 w-3.5" />
          <span>{order.customerName}</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-sm text-kds-timer">
          <Clock className="h-3.5 w-3.5" />
          <span>{elapsed}</span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-1.5">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-accent font-mono">{item.quantity}×</span>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              {item.modifications && item.modifications.length > 0 && (
                <div className="ml-6 mt-0.5">
                  {item.modifications.map((mod, i) => (
                    <span key={i} className="text-xs text-kds-preparing italic">⚡ {mod}</span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-mono">{item.estimatedTime}m</span>
          </div>
        ))}
      </div>

      {/* Footer action */}
      {order.status === "ready" ? (
        <button
          onClick={(e) => { e.stopPropagation(); onDismiss(order.id); }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-kds-ready py-2.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <CheckCircle className="h-4 w-4" />
          COMPLETED
        </button>
      ) : (
        <div className={`mt-3 flex items-center justify-end gap-1 text-xs ${config.textClass} opacity-60`}>
          <span>Tap to advance</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}
