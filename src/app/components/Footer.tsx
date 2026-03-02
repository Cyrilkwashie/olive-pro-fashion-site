import { Link } from "react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{ background: "#1A1A2E", fontFamily: "'DM Sans', sans-serif" }}
      className="text-white"
    >
      {/* Newsletter section */}
      <div
        style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        className="py-16 px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem",
                fontWeight: 400,
                letterSpacing: "0.05em",
              }}
            >
              Join the OLIVÉ Circle
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", letterSpacing: "0.05em" }} className="mt-2">
              Be the first to know about new collections, events, and exclusive offers.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full lg:w-auto gap-0"
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRight: "none",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                outline: "none",
                padding: "12px 20px",
                width: "280px",
              }}
              className="placeholder:text-white/30 flex-1 lg:flex-none"
            />
            <button
              type="submit"
              style={{
                background: "white",
                color: "#1A1A2E",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                padding: "12px 24px",
                border: "1px solid white",
                cursor: "pointer",
              }}
              className="uppercase hover:bg-[#ECECF4] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer links */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem",
                fontWeight: 400,
                letterSpacing: "0.3em",
              }}
            >
              OLIVÉ
            </span>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", lineHeight: "1.8" }} className="mt-4 max-w-[200px]">
              Designed for the modern woman who values quality, simplicity, and effortless style.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  className="hover:text-white transition-colors"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Shop",
              links: ["New Arrivals", "Dresses", "Tops", "Trousers", "Skirts", "Jackets", "Knitwear"],
            },
            {
              title: "Company",
              links: ["About Olivé", "Sustainability", "Careers", "Press", "Stores"],
            },
            {
              title: "Help",
              links: ["Shipping & Returns", "Size Guide", "Contact Us", "FAQs", "Accessibility"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1.2rem",
                }}
                className="uppercase"
              >
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="/shop"
                      style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        className="py-6 px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
            © 2026 OLIVÉ by Olivia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <button
                key={item}
                style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.05em" }}
                className="hover:text-white/60 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
