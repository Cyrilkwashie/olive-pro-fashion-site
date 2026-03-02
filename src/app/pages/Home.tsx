import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products, categories } from "../data/products";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1673106020385-d7fd8fa77569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwY2xvdGhpbmclMjBjb2xsZWN0aW9uJTIwbG9va2Jvb2t8ZW58MXx8fHwxNzcyMTM1NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1768039049614-f3c2bae3f1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvciUyMHdoaXRlJTIwY2xlYW58ZW58MXx8fHwxNzcyMTM1NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const CATEGORY_IMAGES = [
  "https://images.unsplash.com/photo-1762605135012-56a59a059e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tZW4lMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbWluaW1hbHxlbnwxfHx8fDE3NzIxMzU3MDN8MA&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1706188458155-f2803026b3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHNraXJ0JTIwcGxlYXRlZCUyMG1pZGklMjBlbGVnYW50fGVufDF8fHx8MTc3MjEzNTcxM3ww&ixlib=rb-4.1.0&q=80&w=600",
  "https://images.unsplash.com/photo-1715408153725-186c6c77fb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGJsYXplciUyMGNvYXQlMjBjaGljJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzIxMzU3MDd8MA&ixlib=rb-4.1.0&q=80&w=600",
];

const featuredProducts = products.slice(0, 4);

export default function Home() {
  return (
    <div style={{ background: "#FAFAFC" }}>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="OLIVÉ Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Soft overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(26,26,46,0.38) 0%, rgba(0,0,0,0.1) 100%)" }}
        />

        {/* Hero content */}
        <div className="relative h-full flex flex-col justify-center px-8 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.75)",
              }}
              className="uppercase mb-5"
            >
              Spring / Summer 2026
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: "1.05",
                letterSpacing: "-0.01em",
              }}
            >
              The New
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Collection</em>
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                lineHeight: "1.7",
                maxWidth: "360px",
              }}
              className="mt-5 mb-8"
            >
              Pieces crafted for the woman who moves through the world with quiet confidence and undeniable grace.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                style={{
                  background: "white",
                  color: "#1A1A2E",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  padding: "14px 32px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
                className="uppercase hover:bg-[#ECECF4] transition-colors"
              >
                Shop Now <ArrowRight size={13} strokeWidth={2} />
              </Link>
              <Link
                to="/about"
                style={{
                  border: "1px solid rgba(255,255,255,0.6)",
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  padding: "14px 32px",
                  textDecoration: "none",
                }}
                className="uppercase hover:border-white transition-colors"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <ChevronDown size={20} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────── */}
      <div
        style={{
          background: "#1A1A2E",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.5)",
          padding: "14px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className="inline-flex gap-16"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i}>
              OLIVÉ &nbsp;·&nbsp; SPRING SUMMER 2026 &nbsp;·&nbsp; NEW ARRIVALS &nbsp;·&nbsp; FREE SHIPPING OVER $250 &nbsp;·&nbsp; SUSTAINABLE FASHION &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#9A9AAD",
            }}
            className="uppercase mb-3"
          >
            Shop by Category
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#1A1A2E",
              letterSpacing: "0.02em",
            }}
          >
            Curated Collections
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Dresses", sub: "Effortless silhouettes", img: CATEGORY_IMAGES[0] },
            { name: "Skirts", sub: "Fluid & feminine", img: CATEGORY_IMAGES[1] },
            { name: "Jackets", sub: "Refined outerwear", img: CATEGORY_IMAGES[2] },
          ].map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ aspectRatio: i === 1 ? "3/4" : "3/4" }}
            >
              <Link to={`/shop?category=${cat.name}`}>
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to top, rgba(26,26,46,0.7) 0%, rgba(0,0,0,0) 55%)" }}
                />
                <div className="absolute bottom-6 left-6">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.65)",
                    }}
                    className="uppercase mb-1"
                  >
                    {cat.sub}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.7rem",
                      fontWeight: 400,
                      color: "white",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.8)",
                      marginTop: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      borderBottom: "1px solid rgba(255,255,255,0.4)",
                      paddingBottom: "2px",
                    }}
                    className="uppercase group-hover:border-white transition-colors"
                  >
                    Explore <ArrowRight size={11} strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────────────────── */}
      <section
        style={{ background: "#F3F3F7" }}
        className="py-20 lg:py-28 px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  color: "#9A9AAD",
                }}
                className="uppercase mb-3"
              >
                Latest Arrivals
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "#1A1A2E",
                }}
              >
                New This Season
              </h2>
            </div>
            <Link
              to="/shop"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                color: "#1A1A2E",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid #1A1A2E",
                paddingBottom: "2px",
              }}
              className="uppercase hidden md:flex hover:opacity-60 transition-opacity"
            >
              View All <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link
              to="/shop"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "white",
                textDecoration: "none",
                background: "#1A1A2E",
                padding: "14px 32px",
                display: "inline-block",
              }}
              className="uppercase"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY BANNER ──────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="absolute inset-0 -translate-x-4 -translate-y-4"
              style={{ border: "1px solid #DCDCE4", zIndex: 0 }}
            />
            <img
              src={STORY_IMAGE}
              alt="OLIVÉ Studio"
              className="relative z-10 w-full object-cover"
              style={{ aspectRatio: "4/5" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "#9A9AAD",
              }}
              className="uppercase mb-5"
            >
              Our Story
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "#1A1A2E",
                lineHeight: "1.1",
              }}
            >
              Designed with
              <br />
              <em style={{ fontStyle: "italic" }}>intention,</em>
              <br />
              made to last.
            </h2>
            <div
              style={{ width: "40px", height: "1px", background: "#C8C8D8", margin: "24px 0" }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#6A6A82",
                fontSize: "0.85rem",
                lineHeight: "1.9",
                letterSpacing: "0.02em",
                maxWidth: "420px",
              }}
            >
              OLIVÉ was born from Olivia's vision of a wardrobe built on timeless pieces rather than fleeting trends. Each garment is thoughtfully designed, ethically produced, and built to be worn for years — not seasons.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#6A6A82",
                fontSize: "0.85rem",
                lineHeight: "1.9",
                letterSpacing: "0.02em",
                maxWidth: "420px",
                marginTop: "16px",
              }}
            >
              We believe true style is quiet. It lives in the quality of a fabric, the precision of a cut, and the confidence of a woman who knows exactly who she is.
            </p>
            <Link
              to="/about"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "#1A1A2E",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1px solid #1A1A2E",
                paddingBottom: "3px",
                marginTop: "28px",
              }}
              className="uppercase hover:opacity-60 transition-opacity"
            >
              Read More <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ALL PRODUCTS ──────────────────────────────────────────── */}
      <section
        style={{ background: "#F3F3F7" }}
        className="py-20 lg:py-28 px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "#9A9AAD",
              }}
              className="uppercase mb-3"
            >
              The Edit
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#1A1A2E",
              }}
            >
              Shop the Collection
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {products.slice(4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH PROMO BANNER ──────────────────────────────── */}
      <section
        className="py-24 px-6 lg:px-12 text-center relative overflow-hidden"
        style={{ background: "#1A1A2E" }}
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.45)",
              }}
              className="uppercase mb-5"
            >
              Limited Time
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: "1.1",
                letterSpacing: "0.02em",
              }}
            >
              Up to 30% Off
              <br />
              <em style={{ fontStyle: "italic" }}>Selected Pieces</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                marginTop: "16px",
                marginBottom: "32px",
              }}
            >
              Our seasonal edit is here. Elevated essentials at exceptional value.
            </p>
            <Link
              to="/shop?filter=sale"
              style={{
                border: "1px solid rgba(255,255,255,0.5)",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                padding: "14px 40px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              className="uppercase hover:border-white hover:bg-white hover:text-[#1A1A2E] transition-all"
            >
              Shop the Sale <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
