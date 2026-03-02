import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

export default function AdminCustomers() {
  const { customers, orders } = useAdmin();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "totalSpent" | "ordersCount" | "joinedDate">("totalSpent");

  const enriched = customers.map((c) => {
    const customerOrders = orders.filter((o) => o.customerId === c.id);
    const actualSpent = customerOrders
      .filter((o) => o.status !== "Cancelled")
      .reduce((s, o) => s + o.total, 0);
    return { ...c, totalSpent: actualSpent, ordersCount: customerOrders.length };
  });

  const filtered = enriched
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "totalSpent") return b.totalSpent - a.totalSpent;
      if (sortBy === "ordersCount") return b.ordersCount - a.ordersCount;
      if (sortBy === "joinedDate") return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
      return 0;
    });

  const totalRevenue = enriched.reduce((s, c) => s + c.totalSpent, 0);
  const avgOrderValue = enriched.reduce((s, c) => s + c.ordersCount, 0) > 0
    ? totalRevenue / enriched.reduce((s, c) => s + c.ordersCount, 0)
    : 0;

  const fieldStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    background: "#FAFAFC",
  };

  const AVATAR_COLORS = [
    "#6366F1", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6",
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#030213", margin: 0 }}>Customers</h1>
        <p style={{ color: "#7A7A96", fontSize: 14, marginTop: 4 }}>
          {customers.length} registered customers
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total Customers", value: customers.length },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}` },
          { label: "Avg. Order Value", value: `$${avgOrderValue.toFixed(0)}` },
          { label: "Repeat Buyers", value: enriched.filter((c) => c.ordersCount > 1).length },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "16px 20px" }}>
            <p style={{ color: "#7A7A96", fontSize: 12, margin: 0 }}>{label}</p>
            <p style={{ color: "#030213", fontSize: 24, fontWeight: 700, margin: "4px 0 0" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          placeholder="Search customers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...fieldStyle, flex: "1 1 200px", maxWidth: 300 }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          style={{ ...fieldStyle, cursor: "pointer" }}
        >
          <option value="totalSpent">Sort by: Most Spent</option>
          <option value="ordersCount">Sort by: Most Orders</option>
          <option value="joinedDate">Sort by: Newest</option>
          <option value="name">Sort by: Name</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAFC" }}>
                {["Customer", "Location", "Orders", "Total Spent", "Joined"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#7A7A96", letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "#7A7A96", fontSize: 14 }}>
                    No customers found.
                  </td>
                </tr>
              )}
              {filtered.map((c, i) => {
                const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
                return (
                  <tr
                    key={c.id}
                    style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.05)", transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 600,
                            flexShrink: 0,
                          }}
                        >
                          {c.avatar}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#030213" }}>{c.name}</p>
                          <p style={{ margin: 0, fontSize: 11, color: "#7A7A96" }}>{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#7A7A96" }}>{c.location}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#030213", fontWeight: 500 }}>
                      {c.ordersCount}
                      {c.ordersCount > 1 && (
                        <span style={{ marginLeft: 6, padding: "1px 7px", borderRadius: 9999, fontSize: 11, background: "#D1FAE5", color: "#065F46", fontWeight: 600 }}>
                          Repeat
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#030213" }}>
                      ${c.totalSpent.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#7A7A96", whiteSpace: "nowrap" }}>
                      {new Date(c.joinedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
