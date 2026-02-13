import { Station } from "@/types/kds";
import { Flame, Coffee, IceCream, Salad, LayoutGrid } from "lucide-react";

type StationFilter = Station | "all";

interface StationTabsProps {
  active: StationFilter;
  onChange: (station: StationFilter) => void;
  counts: Record<StationFilter, number>;
}

const stations: { id: StationFilter; label: string; icon: typeof Flame }[] = [
  { id: "all", label: "All Orders", icon: LayoutGrid },
  { id: "grill", label: "Grill", icon: Flame },
  { id: "drinks", label: "Drinks", icon: Coffee },
  { id: "desserts", label: "Desserts", icon: IceCream },
  { id: "salads", label: "Salads", icon: Salad },
];

export function StationTabs({ active, onChange, counts }: StationTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {stations.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
              isActive
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <s.icon className="h-4 w-4" />
            {s.label}
            <span className={`ml-1 rounded-full px-1.5 py-0.5 text-xs font-bold ${
              isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {counts[s.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
