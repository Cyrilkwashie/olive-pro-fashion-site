import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div
        style={{ background: "#1A1A2E", fontFamily: "'DM Sans', sans-serif" }}
        className="text-white text-center py-2.5 text-xs tracking-[0.12em]"
      >
        FREE SHIPPING ON ORDERS OVER $250 &nbsp;·&nbsp; NEW ARRIVALS EVERY THURSDAY
      </div>

      {/* Main navbar */}
      <header
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: isScrolled ? "rgba(250,250,252,0.96)" : "#FAFAFC",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: mobile menu + desktop nav */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-1"
                aria-label="Open menu"
              >
                <Menu size={22} color="#1A1A2E" strokeWidth={1.5} />
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    style={{ color: "#3A3A54", letterSpacing: "0.08em" }}
                    className="text-xs hover:text-[#1A1A2E] transition-colors duration-200 uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.9rem",
                fontWeight: 400,
                color: "#1A1A2E",
                letterSpacing: "0.25em",
                textDecoration: "none",
              }}
            >
              OLIVÉ
            </Link>

            {/* Right: actions */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="p-1 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                {searchOpen ? (
                  <X size={20} color="#1A1A2E" strokeWidth={1.5} />
                ) : (
                  <Search size={20} color="#1A1A2E" strokeWidth={1.5} />
                )}
              </button>
              <Link to="/cart" className="p-1 relative hover:opacity-60 transition-opacity">
                <ShoppingBag size={20} color="#1A1A2E" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span
                    style={{
                      background: "#1A1A2E",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "9px",
                    }}
                    className="absolute -top-1 -right-1 text-white w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "#FAFAFC" }}
              className="overflow-hidden"
            >
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pieces…"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#1A1A2E",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #1A1A2E",
                    outline: "none",
                    fontSize: "1rem",
                    letterSpacing: "0.03em",
                    width: "100%",
                    paddingBottom: "6px",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{ background: "#FAFAFC", fontFamily: "'DM Sans', sans-serif" }}
              className="fixed inset-y-0 left-0 z-50 w-80 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[rgba(0,0,0,0.06)]">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    letterSpacing: "0.25em",
                    color: "#1A1A2E",
                  }}
                >
                  OLIVÉ
                </span>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={20} color="#1A1A2E" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    style={{ color: "#3A3A54", letterSpacing: "0.1em", fontSize: "0.8rem" }}
                    className="uppercase hover:text-[#1A1A2E] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t border-[rgba(0,0,0,0.06)]">
                <p style={{ color: "#9A9AAD", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                  FREE SHIPPING OVER $250
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}