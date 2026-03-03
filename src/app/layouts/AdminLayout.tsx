import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { AdminProvider, useAdmin } from "../context/AdminContext";

// ── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen() {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(password);
      if (!ok) {
        setError(true);
        setLoading(false);
        setPassword("");
      }
    }, 500);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#0D0D0D",
        display: "flex",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Left — editorial image */}
      <div
        style={{ flex: "0 0 52%", position: "relative", overflow: "hidden" }}
        className="hidden lg:block"
      >
        <img
          src="https://i.pinimg.com/1200x/b9/66/6e/b9666ee5806aeb08397d84777ded0e15.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.15) 55%, rgba(13,13,13,0.72) 100%)",
          }}
        />
        <div style={{ position: "absolute", bottom: 52, left: 52 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 4vw, 4rem)",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "0.18em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            OLIVÉ
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.34em",
              color: "rgba(255,255,255,0.45)",
              marginTop: 12,
              textTransform: "uppercase",
            }}
          >
            Admin Console
          </p>
        </div>
      </div>

      {/* Right — login form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px clamp(32px, 8vw, 72px)",
        }}
      >
        <div className="lg:hidden" style={{ marginBottom: 52 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.2rem",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "0.18em",
              margin: 0,
            }}
          >
            OLIVÉ
          </p>
        </div>

        <div style={{ maxWidth: 380 }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              margin: "0 0 14px",
            }}
          >
            Restricted Access
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.6rem",
              fontWeight: 400,
              color: "#ffffff",
              margin: "0 0 10px",
              letterSpacing: "0.03em",
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.38)", margin: "0 0 44px", lineHeight: 1.6 }}>
            Enter your password to access the Olivé admin dashboard.
          </p>

          <form onSubmit={handle}>
            <div style={{ marginBottom: 22 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="••••••••••"
                autoFocus
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: error
                    ? "1px solid rgba(220,80,80,0.65)"
                    : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s, background 0.2s",
                  letterSpacing: "0.12em",
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
              {error && (
                <p style={{ color: "rgba(230,90,90,0.9)", fontSize: "0.78rem", marginTop: 8 }}>
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password || loading}
              style={{
                width: "100%",
                padding: "14px",
                background: password && !loading ? "#C9A96E" : "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: 6,
                color: password && !loading ? "#111119" : "rgba(255,255,255,0.25)",
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: password && !loading ? "pointer" : "default",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {loading ? "Verifying…" : "Sign In"}
            </button>
          </form>

          <div
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 26, height: 26, background: "#C9A96E", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontWeight: 600, color: "#111119" }}>O</span>
            </div>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em" }}>
              Olivé Fashion · &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// ── Nav items ─────────────────────────────────────────────────────────────────
const navItems = [
  { to: "/admin", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/admin/products", label: "Products", icon: ProductsIcon, end: false },
  { to: "/admin/orders", label: "Orders", icon: OrdersIcon, end: false },
  { to: "/admin/customers", label: "Customers", icon: CustomersIcon, end: false },
];

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/customers": "Customers",
};

// ── Shell ─────────────────────────────────────────────────────────────────────
function AdminShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, orders } = useAdmin();

  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const pageTitle = pageTitles[location.pathname] ?? "Admin";
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#F4F3EF" }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside
        style={{
          width: sidebarOpen ? 252 : 68,
          minWidth: sidebarOpen ? 252 : 68,
          background: "#111119",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.22s cubic-bezier(0.4,0,0.2,1), min-width 0.22s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarOpen ? "26px 22px 20px" : "26px 16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            whiteSpace: "nowrap",
            minHeight: 80,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#C9A96E",
              borderRadius: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600, color: "#111119", letterSpacing: 1 }}>O</span>
          </div>
          {sidebarOpen && (
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ffffff", fontWeight: 500, fontSize: 17, lineHeight: 1.1, letterSpacing: "0.06em" }}>
                OLIVÉ
              </p>
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.58rem", letterSpacing: "0.24em", textTransform: "uppercase", marginTop: 3 }}>
                Admin Console
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {sidebarOpen && (
            <p style={{ fontSize: "0.57rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", padding: "6px 12px 10px" }}>
              Menu
            </p>
          )}
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: sidebarOpen ? "10px 14px" : "10px 0",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                borderRadius: 8,
                textDecoration: "none",
                background: isActive ? "rgba(201,169,110,0.12)" : "transparent",
                color: isActive ? "#C9A96E" : "rgba(255,255,255,0.42)",
                fontWeight: isActive ? 600 : 400,
                fontSize: 13.5,
                whiteSpace: "nowrap",
                transition: "background 0.15s, color 0.15s",
                position: "relative",
              })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 2.5, background: "#C9A96E", borderRadius: 2 }} />
                  )}
                  <Icon size={16} />
                  {sidebarOpen && <span style={{ flex: 1 }}>{label}</span>}
                  {sidebarOpen && label === "Orders" && pendingCount > 0 && (
                    <span style={{ background: "#C9A96E", color: "#111119", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 9999, lineHeight: 1.4 }}>
                      {pendingCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "10px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 2 }}>
          <button
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: sidebarOpen ? "10px 14px" : "10px 0", justifyContent: sidebarOpen ? "flex-start" : "center", width: "100%", borderRadius: 8, background: "transparent", border: "none", color: "rgba(255,255,255,0.32)", fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.15s, background 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.32)"; e.currentTarget.style.background = "transparent"; }}
          >
            <StoreIcon size={15} />
            {sidebarOpen && <span>View Store</span>}
          </button>
          <button
            onClick={logout}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: sidebarOpen ? "10px 14px" : "10px 0", justifyContent: sidebarOpen ? "flex-start" : "center", width: "100%", borderRadius: 8, background: "transparent", border: "none", color: "rgba(255,255,255,0.32)", fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.15s, background 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#e07070"; e.currentTarget.style.background = "rgba(220,80,80,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.32)"; e.currentTarget.style.background = "transparent"; }}
          >
            <LogoutIcon size={15} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Top bar */}
        <header
          style={{
            background: "#ffffff",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            padding: "0 28px",
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            style={{ border: "none", background: "none", cursor: "pointer", color: "#8A8A9A", padding: "6px 4px", borderRadius: 6, display: "flex", alignItems: "center", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111119")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A9A")}
          >
            <MenuIcon size={20} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 12, color: "#BBBBCC" }}>Admin</span>
            <span style={{ fontSize: 12, color: "#DDDDE8" }}>/</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#111119" }}>{pageTitle}</span>
          </div>

          <div style={{ flex: 1 }} />

          <p style={{ fontSize: 12, color: "#9A9AAD" }} className="hidden md:block">{today}</p>

          {/* Avatar + dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              style={{ width: 36, height: 36, borderRadius: "50%", background: "#111119", border: "2px solid transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 500, color: "#C9A96E", letterSpacing: 1 }}>A</span>
            </button>

            {userMenuOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setUserMenuOpen(false)} />
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 10px)",
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 10,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                    minWidth: 200,
                    zIndex: 50,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "14px 18px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111119", margin: 0 }}>Admin</p>
                    <p style={{ fontSize: 11, color: "#9A9AAD", margin: "2px 0 0" }}>admin@olivefashion.com</p>
                  </div>
                  <div style={{ padding: "6px" }}>
                    <button
                      onClick={() => { navigate("/"); setUserMenuOpen(false); }}
                      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 6, border: "none", background: "none", fontSize: 13, color: "#3A3A54", cursor: "pointer", textAlign: "left" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F3EF")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <StoreIcon size={14} /> View store
                    </button>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", borderRadius: 6, border: "none", background: "none", fontSize: 13, color: "#C05050", cursor: "pointer", textAlign: "left" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <LogoutIcon size={14} /> Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        <main style={{ flex: 1, overflow: "auto", padding: 28 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AdminLayout() {
  return (
    <AdminProvider>
      <AdminGate />
    </AdminProvider>
  );
}

function AdminGate() {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <AdminShell /> : <LoginScreen />;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function DashboardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function ProductsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function OrdersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}
function CustomersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function StoreIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function LogoutIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function MenuIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

