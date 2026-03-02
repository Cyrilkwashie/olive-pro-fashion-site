import { useAdmin } from "../../context/AdminContext";
import { Link } from "react-router";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending:    { bg: "#FEF3C7", color: "#92400E" },
  Processing: { bg: "#DBEAFE", color: "#1E40AF" },
  Shipped:    { bg: "#E0E7FF", color: "#3730A3" },
  Delivered:  { bg: "#D1FAE5", color: "#065F46" },
  Cancelled:  { bg: "#FEE2E2", color: "#991B1B" },
};

export default function Dashboard() {
  const { products, orders, customers } = useAdmin();

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const newProducts = products.filter((p) => p.isNew);
  const saleProducts = products.filter((p) => p.isSale);

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      sub: "Excluding cancelled orders",
      icon: RevenueIcon,
      accent: "#030213",
    },
    {
      label: "Total Orders",
      value: orders.length,
      sub: `${orders.filter((o) => o.status === "Pending").length} pending`,
      icon: OrdersIcon,
      accent: "#6366F1",
    },
    {
      label: "Products",
      value: products.length,
      sub: `${newProducts.length} new · ${saleProducts.length} on sale`,
      icon: ProductsIcon,
      accent: "#0EA5E9",
    },
    {
      label: "Customers",
      value: customers.length,
      sub: "Registered accounts",
      icon: CustomersIcon,
      accent: "#10B981",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#030213", margin: 0 }}>Dashboard</h1>
        <p style={{ color: "#7A7A96", fontSize: 14, marginTop: 4 }}>Welcome back — here's what's happening today.</p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {stats.map(({ label, value, sub, icon: Icon, accent }) => (
          <div
            key={label}
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: "20px 24px",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "#7A7A96", fontSize: 13, margin: 0 }}>{label}</p>
                <p style={{ color: "#030213", fontSize: 28, fontWeight: 700, margin: "4px 0 0", lineHeight: 1.1 }}>
                  {value}
                </p>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: accent + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: accent,
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </div>
            </div>
            <p style={{ color: "#7A7A96", fontSize: 12, margin: "10px 0 0" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders + quick links */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "start" }}>
        {/* Recent orders table */}
        <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#030213", margin: 0 }}>Recent Orders</h2>
            <Link to="/admin/orders" style={{ color: "#6366F1", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>View all →</Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAFC" }}>
                  {["Order", "Customer", "Items", "Date", "Total", "Status"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#7A7A96",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => {
                  const sc = STATUS_COLORS[order.status] ?? STATUS_COLORS.Pending;
                  return (
                    <tr
                      key={order.id}
                      style={{
                        borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.05)",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFC")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13, color: "#030213", whiteSpace: "nowrap" }}>{order.id}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ margin: 0, fontSize: 13, color: "#1A1A2E", fontWeight: 500 }}>{order.customerName}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#7A7A96" }}>{order.customerEmail}</p>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#7A7A96" }}>
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#7A7A96", whiteSpace: "nowrap" }}>
                        {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#030213", whiteSpace: "nowrap" }}>
                        ${order.total.toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: 9999,
                            fontSize: 12,
                            fontWeight: 600,
                            background: sc.bg,
                            color: sc.color,
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick stats sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 220 }}>
          {/* Order statuses */}
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "18px 20px" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#030213", margin: "0 0 14px" }}>Order Status</h3>
            {(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const).map((status) => {
              const count = orders.filter((o) => o.status === status).length;
              const sc = STATUS_COLORS[status];
              return (
                <div key={status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#1A1A2E" }}>{status}</span>
                  <span
                    style={{
                      minWidth: 26,
                      textAlign: "center",
                      padding: "2px 8px",
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 600,
                      background: sc.bg,
                      color: sc.color,
                    }}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Top products */}
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "18px 20px" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#030213", margin: "0 0 14px" }}>Top Rated</h3>
            {[...products]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "#1A1A2E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.name}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: "#7A7A96" }}>★ {p.rating} · ${p.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
function RevenueIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}
function OrdersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function ProductsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
function CustomersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
