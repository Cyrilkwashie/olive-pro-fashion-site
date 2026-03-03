import { useAdmin } from "../../context/AdminContext";
import { Link } from "react-router";

// Simulated monthly revenue data (Jan–Mar actuals + prior months synthetic)
const MONTHLY_DATA = [
  { month: "Oct", revenue: 1820 },
  { month: "Nov", revenue: 2340 },
  { month: "Dec", revenue: 3180 },
  { month: "Jan", revenue: 2760 },
  { month: "Feb", revenue: 3420 },
  { month: "Mar", revenue: 1915 }, // partial month
];

const STATUS_META: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  Pending:    { label: "Pending",    dot: "#F59E0B", bg: "rgba(245,158,11,0.08)",  text: "#92400E" },
  Processing: { label: "Processing", dot: "#6366F1", bg: "rgba(99,102,241,0.08)",  text: "#3730A3" },
  Shipped:    { label: "Shipped",    dot: "#0EA5E9", bg: "rgba(14,165,233,0.08)",  text: "#0369A1" },
  Delivered:  { label: "Delivered",  dot: "#10B981", bg: "rgba(16,185,129,0.08)",  text: "#065F46" },
  Cancelled:  { label: "Cancelled",  dot: "#EF4444", bg: "rgba(239,68,68,0.08)",  text: "#991B1B" },
};

export default function Dashboard() {
  const { products, orders, customers } = useAdmin();

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);

  const pendingCount    = orders.filter((o) => o.status === "Pending").length;
  const processingCount = orders.filter((o) => o.status === "Processing").length;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const maxRevenue = Math.max(...MONTHLY_DATA.map((d) => d.revenue));

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.4%",
      positive: true,
      sub: "vs. last month",
    },
    {
      label: "Total Orders",
      value: String(orders.length),
      change: `${pendingCount} pending`,
      positive: null,
      sub: `${processingCount} processing`,
    },
    {
      label: "Products",
      value: String(products.length),
      change: `${products.filter((p) => p.isNew).length} new`,
      positive: null,
      sub: `${products.filter((p) => p.isSale).length} on sale`,
    },
    {
      label: "Customers",
      value: String(customers.length),
      change: "+3 this month",
      positive: true,
      sub: "registered accounts",
    },
  ];

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.24em", color: "#9A9AAD", textTransform: "uppercase", margin: "0 0 6px" }}>
            Overview
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 400,
              color: "#111119",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            Dashboard
          </h1>
        </div>
        <p style={{ fontSize: 12, color: "#9A9AAD", marginBottom: 4 }}>
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* ── KPI Cards ────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {stats.map(({ label, value, change, positive, sub }) => (
          <div
            key={label}
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: "22px 22px 18px",
              border: "1px solid rgba(0,0,0,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* top accent line */}
            <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 2, background: "linear-gradient(90deg, #C9A96E, transparent)" }} />

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A9AAD", margin: "0 0 10px" }}>
              {label}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.4rem",
                fontWeight: 400,
                color: "#111119",
                margin: "0 0 10px",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {value}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {positive !== null && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: positive ? "#059669" : "#6B6663",
                    background: positive ? "rgba(5,150,105,0.08)" : "rgba(0,0,0,0.04)",
                    padding: "2px 7px",
                    borderRadius: 4,
                  }}
                >
                  {change}
                </span>
              )}
              <span style={{ fontSize: 11, color: "#ADADBE" }}>{positive !== null ? sub : change + " · " + sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main content row ──────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

          {/* ── Revenue chart ───────────────────────────────────────── */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "22px 24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A9AAD", margin: "0 0 4px" }}>Revenue</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#111119", margin: 0 }}>
                  Last 6 Months
                </p>
              </div>
              <span style={{ fontSize: 11, color: "#9A9AAD", background: "#F4F3EF", padding: "4px 10px", borderRadius: 6 }}>
                Oct 2025 – Mar 2026
              </span>
            </div>

            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
              {MONTHLY_DATA.map((d, i) => {
                const height = Math.round((d.revenue / maxRevenue) * 100);
                const isLast = i === MONTHLY_DATA.length - 1;
                return (
                  <div
                    key={d.month}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}
                  >
                    <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                      <div
                        style={{
                          width: "100%",
                          height: `${height}%`,
                          background: isLast
                            ? "repeating-linear-gradient(45deg, #C9A96E22, #C9A96E22 4px, transparent 4px, transparent 8px)"
                            : "linear-gradient(180deg, #C9A96E 0%, rgba(201,169,110,0.65) 100%)",
                          border: isLast ? "1px dashed #C9A96E" : "none",
                          borderRadius: "4px 4px 0 0",
                          transition: "height 0.3s ease",
                          position: "relative",
                        }}
                        title={`$${d.revenue.toLocaleString()}`}
                      />
                    </div>
                    <span style={{ fontSize: 10, color: isLast ? "#C9A96E" : "#9A9AAD", letterSpacing: "0.06em", fontWeight: isLast ? 600 : 400 }}>
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Y-axis labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: 11, color: "#ADADBE" }}>$0</span>
              <span style={{ fontSize: 11, color: "#ADADBE" }}>${(maxRevenue / 2).toLocaleString()}</span>
              <span style={{ fontSize: 11, color: "#ADADBE" }}>${maxRevenue.toLocaleString()}</span>
            </div>
          </div>

          {/* ── Recent orders ────────────────────────────────────────── */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A9AAD", margin: "0 0 3px" }}>Latest</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, color: "#111119", margin: 0 }}>
                  Recent Orders
                </h2>
              </div>
              <Link
                to="/admin/orders"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                View all →
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Order", "Customer", "Date", "Amount", "Status"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 20px",
                          textAlign: "left",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#ADADBE",
                          background: "#FAFAFC",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => {
                    const sm = STATUS_META[order.status] ?? STATUS_META.Pending;
                    return (
                      <tr
                        key={order.id}
                        style={{
                          borderTop: i === 0 ? "1px solid rgba(0,0,0,0.04)" : "1px solid rgba(0,0,0,0.04)",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FDFCFA")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "14px 20px", whiteSpace: "nowrap" }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#111119", letterSpacing: "0.04em" }}>
                            {order.id}
                          </span>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <p style={{ margin: 0, fontSize: 13, color: "#111119", fontWeight: 500, whiteSpace: "nowrap" }}>{order.customerName}</p>
                          <p style={{ margin: 0, fontSize: 11, color: "#ADADBE" }}>{order.customerEmail}</p>
                        </td>
                        <td style={{ padding: "14px 20px", fontSize: 12, color: "#9A9AAD", whiteSpace: "nowrap" }}>
                          {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        </td>
                        <td style={{ padding: "14px 20px", whiteSpace: "nowrap" }}>
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#111119" }}>
                            ${order.total.toLocaleString()}
                          </span>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 500,
                              background: sm.bg,
                              color: sm.text,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: sm.dot, flexShrink: 0 }} />
                            {sm.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Order status breakdown */}
          <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", padding: "20px 20px" }}>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A9AAD", margin: "0 0 3px" }}>Breakdown</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#111119", margin: 0 }}>
                Order Status
              </h3>
            </div>

            {/* Stacked bar */}
            <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", gap: 1, marginBottom: 16 }}>
              {(["Delivered", "Shipped", "Processing", "Pending", "Cancelled"] as const).map((s) => {
                const count = orders.filter((o) => o.status === s).length;
                const pct = orders.length > 0 ? (count / orders.length) * 100 : 0;
                const colors: Record<string, string> = {
                  Delivered: "#10B981", Shipped: "#0EA5E9", Processing: "#6366F1",
                  Pending: "#F59E0B", Cancelled: "#EF4444",
                };
                return pct > 0 ? (
                  <div
                    key={s}
                    title={`${s}: ${count}`}
                    style={{ width: `${pct}%`, background: colors[s], borderRadius: 0 }}
                  />
                ) : null;
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(["Delivered", "Shipped", "Processing", "Pending", "Cancelled"] as const).map((s) => {
                const count = orders.filter((o) => o.status === s).length;
                const sm = STATUS_META[s];
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: sm.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 12.5, color: "#3A3A54" }}>{s}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, color: "#ADADBE" }}>
                        {orders.length > 0 ? Math.round((count / orders.length) * 100) : 0}%
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#111119", minWidth: 18, textAlign: "right" }}>{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top products */}
          <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", padding: "20px 20px" }}>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A9AAD", margin: "0 0 3px" }}>Products</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#111119", margin: 0 }}>
                Top Rated
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {topProducts.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: i < topProducts.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#CCCCDA", fontWeight: 600, width: 16, textAlign: "center", flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: 38, height: 38, borderRadius: 7, objectFit: "cover", objectPosition: "top", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12.5,
                        fontWeight: 500,
                        color: "#111119",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: "#ADADBE", marginTop: 1 }}>
                      ★{p.rating} &nbsp;·&nbsp;
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12.5, color: "#6A6A82" }}>${p.price}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ background: "#111119", borderRadius: 12, padding: "20px 20px" }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 14px" }}>
              Quick Actions
            </p>
            {[
              { label: "Manage Products", to: "/admin/products" },
              { label: "Review Orders", to: "/admin/orders" },
              { label: "View Customers", to: "/admin/customers" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <span>{label}</span>
                <span style={{ opacity: 0.4 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
