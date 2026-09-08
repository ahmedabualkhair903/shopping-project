import { Product } from "@/types/product";

export type OrderItem = Product & {
  quantity: number;
};

export type PaymentMethod = "card" | "cash";

export type OrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ShippingAddress = {
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type Order = {
  id: string;
  customer: OrderCustomer;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
};