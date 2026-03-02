import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { AdminProvider } from "../context/AdminContext";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/admin/products", label: "Products", icon: ProductsIcon, end: false },
  { to: "/admin/orders", label: "Orders", icon: OrdersIcon, end: false },
  { to: "/admin/customers", label: "Customers", icon: CustomersIcon, end: false },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <AdminProvider>
      <div
        className="flex h-screen overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAFC" }}
      >
        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside
          style={{
            width: sidebarOpen ? 240 : 64,
            minWidth: sidebarOpen ? 240 : 64,
            background: "#030213",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.2s, min-width 0.2s",
            overflow: "hidden",
          }}
        >
          {/* Logo area */}
          <div
            style={{
              padding: "24px 16px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "#ffffff",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: "#030213", letterSpacing: -0.5 }}>O</span>
            </div>
            {sidebarOpen && (
              <div>
                <p style={{ color: "#ffffff", fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>
                  Olivia's
                </p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Admin Panel</p>
              </div>
            )}
          </div>

          {/* Nav items */}
          <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  transition: "background 0.15s, color 0.15s",
                })}
              >
                <Icon size={18} />
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Back to store */}
          <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.45)",
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              <BackIcon size={18} />
              {sidebarOpen && <span>Back to Store</span>}
            </button>
          </div>
        </aside>

        {/* ── Main area ────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Top bar */}
          <header
            style={{
              background: "#ffffff",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              padding: "0 24px",
              height: 60,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#7A7A96",
                padding: 6,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Toggle sidebar"
            >
              <MenuIcon size={20} />
            </button>

            <div style={{ flex: 1 }} />

            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "#030213",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              A
            </div>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, overflow: "auto", padding: 28 }}>
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}

// ── Inline SVG icons ─────────────────────────────────────────────────────────
function DashboardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function ProductsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function OrdersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CustomersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function BackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function MenuIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
