export type OrderStatus = "new" | "preparing" | "ready" | "delayed";

export type Station = "grill" | "drinks" | "desserts" | "salads";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  modifications?: string[];
  station: Station;
  estimatedTime: number; // minutes
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  customerName?: string;
  type: "dine-in" | "takeout" | "delivery";
  tableNumber?: number;
  priority: "normal" | "rush";
  estimatedCompletionTime: number; // minutes
  station: Station | "all";
}

export interface KitchenStats {
  avgPrepTime: number;
  ordersCompleted: number;
  ordersActive: number;
  ordersDelayed: number;
  peakHour: string;
  efficiency: number;
  todayIncome: number;
}

export interface HourlyData {
  hour: string;
  orders: number;
  avgTime: number;
}

export interface TrendData {
  day: string;
  orders: number;
  avgPrepTime: number;
  delayed: number;
}
