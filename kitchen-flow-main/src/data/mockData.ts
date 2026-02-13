import { Order, KitchenStats, HourlyData, TrendData } from "@/types/kds";

const now = new Date();
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000);

export const mockOrders: Order[] = [
  {
    id: "1", orderNumber: "#1042", status: "new",
    items: [
      { id: "i1", name: "Wagyu Burger", quantity: 2, station: "grill", estimatedTime: 12, modifications: ["No onions", "Extra cheese"] },
      { id: "i2", name: "Truffle Fries", quantity: 1, station: "grill", estimatedTime: 6 },
    ],
    createdAt: minutesAgo(2), updatedAt: minutesAgo(2),
    customerName: "Table 7", type: "dine-in", tableNumber: 7, priority: "normal",
    estimatedCompletionTime: 12, station: "grill",
  },
  {
    id: "2", orderNumber: "#1043", status: "preparing",
    items: [
      { id: "i3", name: "Mango Smoothie", quantity: 3, station: "drinks", estimatedTime: 4 },
      { id: "i4", name: "Espresso Martini", quantity: 1, station: "drinks", estimatedTime: 3 },
    ],
    createdAt: minutesAgo(8), updatedAt: minutesAgo(5),
    customerName: "Sarah M.", type: "takeout", priority: "normal",
    estimatedCompletionTime: 4, station: "drinks",
  },
  {
    id: "3", orderNumber: "#1044", status: "delayed",
    items: [
      { id: "i5", name: "Ribeye Steak", quantity: 1, station: "grill", estimatedTime: 18, modifications: ["Medium-rare"] },
      { id: "i6", name: "Caesar Salad", quantity: 1, station: "salads", estimatedTime: 5 },
      { id: "i7", name: "Garlic Bread", quantity: 2, station: "grill", estimatedTime: 4 },
    ],
    createdAt: minutesAgo(22), updatedAt: minutesAgo(15),
    customerName: "Table 3", type: "dine-in", tableNumber: 3, priority: "rush",
    estimatedCompletionTime: 18, station: "grill",
  },
  {
    id: "4", orderNumber: "#1045", status: "preparing",
    items: [
      { id: "i8", name: "Chocolate Lava Cake", quantity: 2, station: "desserts", estimatedTime: 10 },
      { id: "i9", name: "Crème Brûlée", quantity: 1, station: "desserts", estimatedTime: 8 },
    ],
    createdAt: minutesAgo(6), updatedAt: minutesAgo(3),
    customerName: "Table 12", type: "dine-in", tableNumber: 12, priority: "normal",
    estimatedCompletionTime: 10, station: "desserts",
  },
  {
    id: "5", orderNumber: "#1046", status: "ready",
    items: [
      { id: "i10", name: "Iced Latte", quantity: 2, station: "drinks", estimatedTime: 3 },
    ],
    createdAt: minutesAgo(10), updatedAt: minutesAgo(1),
    customerName: "Mike D.", type: "takeout", priority: "normal",
    estimatedCompletionTime: 3, station: "drinks",
  },
  {
    id: "6", orderNumber: "#1047", status: "new",
    items: [
      { id: "i11", name: "BBQ Chicken Wings", quantity: 3, station: "grill", estimatedTime: 14 },
      { id: "i12", name: "Coleslaw", quantity: 2, station: "salads", estimatedTime: 3 },
    ],
    createdAt: minutesAgo(1), updatedAt: minutesAgo(1),
    customerName: "DoorDash #882", type: "delivery", priority: "rush",
    estimatedCompletionTime: 14, station: "grill",
  },
  {
    id: "7", orderNumber: "#1048", status: "new",
    items: [
      { id: "i13", name: "Tiramisu", quantity: 1, station: "desserts", estimatedTime: 5 },
      { id: "i14", name: "Cappuccino", quantity: 2, station: "drinks", estimatedTime: 3 },
    ],
    createdAt: minutesAgo(0), updatedAt: minutesAgo(0),
    customerName: "Table 5", type: "dine-in", tableNumber: 5, priority: "normal",
    estimatedCompletionTime: 5, station: "desserts",
  },
  {
    id: "8", orderNumber: "#1049", status: "preparing",
    items: [
      { id: "i15", name: "Grilled Salmon", quantity: 1, station: "grill", estimatedTime: 15, modifications: ["Gluten-free"] },
    ],
    createdAt: minutesAgo(10), updatedAt: minutesAgo(7),
    customerName: "Table 9", type: "dine-in", tableNumber: 9, priority: "normal",
    estimatedCompletionTime: 15, station: "grill",
  },
];

export const mockStats: KitchenStats = {
  avgPrepTime: 11.4,
  ordersCompleted: 147,
  ordersActive: 8,
  ordersDelayed: 1,
  peakHour: "12:00 PM",
  efficiency: 92,
  todayIncome: 4285,
};

export const mockHourlyData: HourlyData[] = [
  { hour: "9AM", orders: 8, avgTime: 9 },
  { hour: "10AM", orders: 15, avgTime: 10 },
  { hour: "11AM", orders: 28, avgTime: 11 },
  { hour: "12PM", orders: 42, avgTime: 14 },
  { hour: "1PM", orders: 38, avgTime: 13 },
  { hour: "2PM", orders: 22, avgTime: 10 },
  { hour: "3PM", orders: 12, avgTime: 8 },
  { hour: "4PM", orders: 10, avgTime: 9 },
  { hour: "5PM", orders: 18, avgTime: 11 },
  { hour: "6PM", orders: 35, avgTime: 13 },
  { hour: "7PM", orders: 45, avgTime: 15 },
  { hour: "8PM", orders: 40, avgTime: 14 },
  { hour: "9PM", orders: 25, avgTime: 12 },
];

export const mockTrendData: TrendData[] = [
  { day: "Mon", orders: 128, avgPrepTime: 11, delayed: 3 },
  { day: "Tue", orders: 135, avgPrepTime: 10, delayed: 2 },
  { day: "Wed", orders: 142, avgPrepTime: 12, delayed: 5 },
  { day: "Thu", orders: 156, avgPrepTime: 11, delayed: 4 },
  { day: "Fri", orders: 189, avgPrepTime: 13, delayed: 7 },
  { day: "Sat", orders: 210, avgPrepTime: 14, delayed: 9 },
  { day: "Sun", orders: 175, avgPrepTime: 12, delayed: 5 },
];
