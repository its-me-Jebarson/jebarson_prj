import { useState, useCallback, useEffect } from "react";
import { Order, OrderStatus } from "@/types/kds";
import { mockOrders } from "@/data/mockData";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      )
    );
  }, []);

  const advanceOrder = useCallback((orderId: string) => {
    const statusFlow: OrderStatus[] = ["new", "preparing", "ready"];
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const currentIndex = statusFlow.indexOf(order.status === "delayed" ? "preparing" : order.status);
        const nextStatus = statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)];
        return { ...order, status: nextStatus, updatedAt: new Date() };
      })
    );
  }, []);

  const dismissOrder = useCallback((orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  }, []);

  // Check for delayed orders
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setOrders((prev) =>
        prev.map((order) => {
          if (order.status === "ready" || order.status === "delayed") return order;
          const elapsed = (now.getTime() - order.createdAt.getTime()) / 60000;
          if (elapsed > order.estimatedCompletionTime + 5) {
            return { ...order, status: "delayed" as OrderStatus, updatedAt: now };
          }
          return order;
        })
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return { orders, updateOrderStatus, advanceOrder, dismissOrder };
}
