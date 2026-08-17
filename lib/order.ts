import type { Order, OrderStatus } from "@/types/order";

const ORDERS_KEY = "ecommerce-orders";

export const getOrders = (): Order[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedOrders = window.localStorage.getItem(
      ORDERS_KEY
    );

    if (!storedOrders) {
      return [];
    }

    const parsedOrders: unknown = JSON.parse(storedOrders);

    if (!Array.isArray(parsedOrders)) {
      return [];
    }

    return parsedOrders as Order[];
  } catch (error) {
    console.error("Failed to load orders:", error);

    return [];
  }
};

export const getOrder = (
  id: string
): Order | null => {
  const orders = getOrders();

  return (
    orders.find((order) => order.id === id) ?? null
  );
};

export const createOrder = (
  order: Order
): Order => {
  if (typeof window === "undefined") {
    return order;
  }

  try {
    const orders = getOrders();

    const updatedOrders = [
      order,
      ...orders.filter(
        (existingOrder) => existingOrder.id !== order.id
      ),
    ];

    window.localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders)
    );

    return order;
  } catch (error) {
    console.error("Failed to create order:", error);

    return order;
  }
};

export const updateOrderStatus = (
  id: string,
  status: OrderStatus
): Order | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const orders = getOrders();

    const orderExists = orders.some(
      (order) => order.id === id
    );

    if (!orderExists) {
      return null;
    }

    const updatedOrders = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            status,
          }
        : order
    );

    window.localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders)
    );

    return (
      updatedOrders.find((order) => order.id === id) ??
      null
    );
  } catch (error) {
    console.error(
      "Failed to update order status:",
      error
    );

    return null;
  }
};

export const clearOrders = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(ORDERS_KEY);
  } catch (error) {
    console.error("Failed to clear orders:", error);
  }
};