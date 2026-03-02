import { useState } from "react";
import { useAdmin, OrderStatus } from "../../context/AdminContext";

const ALL_STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const STATUS_COLORS: Record<OrderStatus, { bg: string; color: string }> = {
  Pending:    { bg: "#FEF3C7", color: "#92400E" },
  Processing: { bg: "#DBEAFE", color: "#1E40AF" },
  Shipped:    { bg: "#E0E7FF", color: "#3730A3" },
  Delivered:  { bg: "#D1FAE5", color: "#065F46" },
  Cancelled:  { bg: "#FEE2E2", color: "#991B1B" },
};

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);

  const fieldStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    background: "#FAFAFC",
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#030213", margin: 0 }}>Orders</h1>
        <p style={{ color: "#7A7A96", fontSize: 14, marginTop: 4 }}>
          {orders.length} orders · ${totalRevenue.toLocaleString()} total revenue
        </p>
      </div>

      {/* Status filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {(["All", ...ALL_STATUSES] as const).map((s) => {
          const active = statusFilter === s;
          const count = s === "All" ? orders.length : orders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "6px 14px",
                border: active ? "1.5px solid #030213" : "1px solid rgba(0,0,0,0.12)",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                background: active ? "#030213" : "#fff",
                color: active ? "#fff" : "#1A1A2E",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {s}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "1px 6px",
                  borderRadius: 9999,
                  background: active ? "rgba(255,255,255,0.2)" : "#ECECF2",
                  color: active ? "#fff" : "#7A7A96",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Search by order ID or customer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...fieldStyle, width: "100%", maxWidth: 320, boxSizing: "border-box" }}
        />
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAFC" }}>
                {["Order ID", "Customer", "Date", "Items", "Total", "Status", "Update Status"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#7A7A96", letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#7A7A96", fontSize: 14 }}>
                    No orders found.
                  </td>
                </tr>
              )}
              {filtered.map((order, i) => {
                const sc = STATUS_COLORS[order.status];
                const isExpanded = expandedId === order.id;
                return (
                  <>
                    <tr
                      key={order.id}
                      style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.05)", cursor: "pointer", transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFC")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    >
                      <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13, color: "#030213" }}>{order.id}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#1A1A2E" }}>{order.customerName}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#7A7A96" }}>{order.customerEmail}</p>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#7A7A96", whiteSpace: "nowrap" }}>
                        {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#7A7A96" }}>
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#030213" }}>
                        ${order.total.toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 9999, fontSize: 12, fontWeight: 600, background: sc.bg, color: sc.color }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }} onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          style={{ padding: "5px 10px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 7, fontSize: 12, background: "#FAFAFC", cursor: "pointer" }}
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    {/* Expanded row: order items */}
                    {isExpanded && (
                      <tr key={`${order.id}-expand`} style={{ background: "#F8F8FC" }}>
                        <td colSpan={7} style={{ padding: "0 16px 16px 56px" }}>
                          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12 }}>
                            <p style={{ fontSize: 12, fontWeight: 600, color: "#7A7A96", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                              Order Items · {order.shippingAddress}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              {order.items.map((item, idx) => (
                                <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#1A1A2E" }}>
                                  <span>{item.productName} — <span style={{ color: "#7A7A96" }}>Size {item.size} · {item.color} · ×{item.quantity}</span></span>
                                  <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
