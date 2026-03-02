import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { products as initialProducts, Product } from "../data/products";

// ── Orders ──────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
  shippingAddress: string;
}

// ── Customers ────────────────────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  location: string;
}

// ── Seed Data ────────────────────────────────────────────────────────────────
const seedOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "c1",
    customerName: "Amelia Carter",
    customerEmail: "amelia.carter@email.com",
    items: [{ productId: "p1", productName: "Silk Slip Dress", quantity: 1, price: 298, size: "S", color: "Ivory" }],
    total: 298,
    status: "Delivered",
    date: "2026-02-14",
    shippingAddress: "12 Rose Lane, London, UK",
  },
  {
    id: "ORD-002",
    customerId: "c2",
    customerName: "Sofia Nguyen",
    customerEmail: "sofia.nguyen@email.com",
    items: [
      { productId: "p2", productName: "Structured Blazer", quantity: 1, price: 485, size: "M", color: "Charcoal" },
      { productId: "p4", productName: "Pleated Midi Skirt", quantity: 1, price: 225, size: "M", color: "Sage" },
    ],
    total: 710,
    status: "Shipped",
    date: "2026-02-18",
    shippingAddress: "88 Pine Street, New York, USA",
  },
  {
    id: "ORD-003",
    customerId: "c3",
    customerName: "Isabella Moore",
    customerEmail: "isabella.moore@email.com",
    items: [{ productId: "p8", productName: "Trench Coat", quantity: 1, price: 595, size: "L", color: "Camel" }],
    total: 595,
    status: "Processing",
    date: "2026-02-23",
    shippingAddress: "45 Elm Court, Paris, France",
  },
  {
    id: "ORD-004",
    customerId: "c4",
    customerName: "Charlotte Williams",
    customerEmail: "charlotte.w@email.com",
    items: [
      { productId: "p3", productName: "Cashmere Knit", quantity: 1, price: 345, size: "XS", color: "Blush" },
      { productId: "p5", productName: "Silk Blouse", quantity: 2, price: 265, size: "XS", color: "White" },
    ],
    total: 875,
    status: "Pending",
    date: "2026-02-26",
    shippingAddress: "3 Maple Drive, Sydney, Australia",
  },
  {
    id: "ORD-005",
    customerId: "c5",
    customerName: "Lily Thompson",
    customerEmail: "lily.t@email.com",
    items: [{ productId: "p7", productName: "Linen Summer Dress", quantity: 1, price: 235, size: "S", color: "Natural" }],
    total: 235,
    status: "Delivered",
    date: "2026-02-10",
    shippingAddress: "7 Cedar Ave, Toronto, Canada",
  },
  {
    id: "ORD-006",
    customerId: "c6",
    customerName: "Grace Adeyemi",
    customerEmail: "grace.adeyemi@email.com",
    items: [{ productId: "p6", productName: "Wide-Leg Trousers", quantity: 1, price: 295, size: "M", color: "Black" }],
    total: 295,
    status: "Cancelled",
    date: "2026-02-05",
    shippingAddress: "21 Baobab Street, Lagos, Nigeria",
  },
  {
    id: "ORD-007",
    customerId: "c1",
    customerName: "Amelia Carter",
    customerEmail: "amelia.carter@email.com",
    items: [{ productId: "p5", productName: "Silk Blouse", quantity: 1, price: 265, size: "S", color: "Pale Blue" }],
    total: 265,
    status: "Delivered",
    date: "2026-01-30",
    shippingAddress: "12 Rose Lane, London, UK",
  },
  {
    id: "ORD-008",
    customerId: "c7",
    customerName: "Nadia Petrov",
    customerEmail: "nadia.petrov@email.com",
    items: [
      { productId: "p1", productName: "Silk Slip Dress", quantity: 1, price: 298, size: "M", color: "Champagne" },
      { productId: "p8", productName: "Trench Coat", quantity: 1, price: 595, size: "S", color: "Light Beige" },
    ],
    total: 893,
    status: "Shipped",
    date: "2026-02-28",
    shippingAddress: "14 Nevsky Prospect, St. Petersburg, Russia",
  },
  {
    id: "ORD-009",
    customerId: "c8",
    customerName: "Elena Vasquez",
    customerEmail: "elena.v@email.com",
    items: [{ productId: "p4", productName: "Pleated Midi Skirt", quantity: 1, price: 225, size: "XS", color: "Dusty Mauve" }],
    total: 225,
    status: "Processing",
    date: "2026-03-01",
    shippingAddress: "9 Calle Flores, Madrid, Spain",
  },
  {
    id: "ORD-010",
    customerId: "c3",
    customerName: "Isabella Moore",
    customerEmail: "isabella.moore@email.com",
    items: [{ productId: "p3", productName: "Cashmere Knit", quantity: 2, price: 345, size: "S", color: "Oatmeal" }],
    total: 690,
    status: "Pending",
    date: "2026-03-02",
    shippingAddress: "45 Elm Court, Paris, France",
  },
];

const seedCustomers: Customer[] = [
  { id: "c1", name: "Amelia Carter", email: "amelia.carter@email.com", avatar: "AC", ordersCount: 2, totalSpent: 563, joinedDate: "2025-09-10", location: "London, UK" },
  { id: "c2", name: "Sofia Nguyen", email: "sofia.nguyen@email.com", avatar: "SN", ordersCount: 1, totalSpent: 710, joinedDate: "2025-11-03", location: "New York, USA" },
  { id: "c3", name: "Isabella Moore", email: "isabella.moore@email.com", avatar: "IM", ordersCount: 2, totalSpent: 1285, joinedDate: "2025-08-22", location: "Paris, France" },
  { id: "c4", name: "Charlotte Williams", email: "charlotte.w@email.com", avatar: "CW", ordersCount: 1, totalSpent: 875, joinedDate: "2025-12-15", location: "Sydney, Australia" },
  { id: "c5", name: "Lily Thompson", email: "lily.t@email.com", avatar: "LT", ordersCount: 1, totalSpent: 235, joinedDate: "2026-01-05", location: "Toronto, Canada" },
  { id: "c6", name: "Grace Adeyemi", email: "grace.adeyemi@email.com", avatar: "GA", ordersCount: 1, totalSpent: 0, joinedDate: "2026-01-28", location: "Lagos, Nigeria" },
  { id: "c7", name: "Nadia Petrov", email: "nadia.petrov@email.com", avatar: "NP", ordersCount: 1, totalSpent: 893, joinedDate: "2025-10-17", location: "St. Petersburg, Russia" },
  { id: "c8", name: "Elena Vasquez", email: "elena.v@email.com", avatar: "EV", ordersCount: 1, totalSpent: 225, joinedDate: "2026-02-12", location: "Madrid, Spain" },
];

// ── Context Types ─────────────────────────────────────────────────────────────
interface AdminContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;

  customers: Customer[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [customers] = useState<Customer[]>(seedCustomers);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    const id = `p${Date.now()}`;
    setProducts((prev) => [{ ...product, id }, ...prev]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }, []);

  return (
    <AdminContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        customers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
