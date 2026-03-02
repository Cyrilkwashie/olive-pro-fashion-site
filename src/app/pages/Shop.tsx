import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, ChevronDown, X, Grid2x2, Grid3x3 } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products, categories } from "../data/products";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [grid, setGrid] = useState<3 | 4>(4);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800]);

  const activeCategory = searchParams.get("category") || "All";
  const activeFilter = searchParams.get("filter") || "";

  const allCategories = ["All", ...categories.map((c) => c.name)];

  const setCategory = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeFilter === "new") list = list.filter((p) => p.isNew);
    if (activeFilter === "sale") list = list.filter((p) => p.isSale);
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest") list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
    return list;
  }, [activeCategory, activeFilter, sort, priceRange]);

  return (
    <div style={{ background: "#FAFAFC", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          background: "#F3F3F7",
          borderBottom: "1px solid #DCDCE4",
        }}
        className="py-12 px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "#9A9AAD",
              }}
              className="uppercase mb-2"
            >
              {activeFilter === "sale"
                ? "Special Offers"
                : activeFilter === "new"
                ? "Latest Arrivals"
                : "The Collection"}
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#1A1A2E",
              }}
            >
              {activeCategory !== "All"
                ? activeCategory
                : activeFilter === "sale"
                ? "Sale"
                : activeFilter === "new"
                ? "New Arrivals"
                : "All Pieces"}
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "#9A9AAD",
                marginTop: "6px",
              }}
            >
              {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Category filter tabs */}
        <div
          style={{ borderBottom: "1px solid #DCDCE4" }}
          className="flex items-center gap-1 overflow-x-auto py-5 no-scrollbar"
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                padding: "6px 18px",
                border: activeCategory === cat ? "1px solid #1A1A2E" : "1px solid transparent",
                background: activeCategory === cat ? "#1A1A2E" : "transparent",
                color: activeCategory === cat ? "white" : "#6A6A82",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
              className="uppercase"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between py-5">
          <button
            onClick={() => setFilterOpen(true)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              color: "#3A3A54",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="uppercase hover:text-[#1A1A2E] transition-colors"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filter
          </button>

          <div className="flex items-center gap-4">
            {/* Grid toggle */}
            <div className="hidden lg:flex items-center gap-1">
              <button onClick={() => setGrid(3)} className={`p-1.5 ${grid === 3 ? "opacity-100" : "opacity-30"}`}>
                <Grid2x2 size={16} strokeWidth={1.5} color="#1A1A2E" />
              </button>
              <button onClick={() => setGrid(4)} className={`p-1.5 ${grid === 4 ? "opacity-100" : "opacity-30"}`}>
                <Grid3x3 size={16} strokeWidth={1.5} color="#1A1A2E" />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((s) => !s)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "#3A3A54",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                className="uppercase hover:text-[#1A1A2E] transition-colors"
              >
                Sort: {sortOptions.find((o) => o.value === sort)?.label}
                <ChevronDown size={13} strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      background: "white",
                      border: "1px solid #DCDCE4",
                      minWidth: "200px",
                      zIndex: 30,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSort(opt.value);
                          setSortOpen(false);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "10px 18px",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.78rem",
                          color: sort === opt.value ? "#1A1A2E" : "#6A6A82",
                          background: sort === opt.value ? "#F3F3F7" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                        className="hover:bg-[#F3F3F7]"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid grid-cols-2 gap-5 lg:gap-6 pb-20`}
              style={{
                gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
              }}
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center"
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  color: "#AFAFBE",
                  fontWeight: 300,
                }}
              >
                No pieces found
              </p>
              <button
                onClick={() => setCategory("All")}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "#1A1A2E",
                  marginTop: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                className="uppercase"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter sidebar */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{ background: "#FAFAFC", fontFamily: "'DM Sans', sans-serif" }}
              className="fixed inset-y-0 right-0 z-50 w-80 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[rgba(0,0,0,0.06)]">
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: "#1A1A2E",
                    fontWeight: 500,
                  }}
                  className="uppercase"
                >
                  Filter
                </span>
                <button onClick={() => setFilterOpen(false)}>
                  <X size={18} color="#1A1A2E" strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Category filter */}
                <div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "#9A9AAD",
                      marginBottom: "12px",
                    }}
                    className="uppercase"
                  >
                    Category
                  </p>
                  <div className="space-y-2">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setFilterOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "8px 0",
                          fontSize: "0.82rem",
                          color: activeCategory === cat ? "#1A1A2E" : "#6A6A82",
                          fontWeight: activeCategory === cat ? 500 : 400,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <span>{cat}</span>
                        {activeCategory === cat && (
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1A1A2E" }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "#9A9AAD",
                      marginBottom: "12px",
                    }}
                    className="uppercase"
                  >
                    Price Range
                  </p>
                  <div className="space-y-3">
                    {[[0, 200], [200, 400], [400, 600], [600, 800]].map(([min, max]) => (
                      <button
                        key={`${min}-${max}`}
                        onClick={() => setPriceRange([min, max])}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "0.82rem",
                          color: priceRange[0] === min && priceRange[1] === max ? "#1A1A2E" : "#6A6A82",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px 0",
                        }}
                      >
                        <div
                          style={{
                            width: "14px",
                            height: "14px",
                            border: `1px solid ${priceRange[0] === min && priceRange[1] === max ? "#1A1A2E" : "#DCDCE4"}`,
                            background: priceRange[0] === min && priceRange[1] === max ? "#1A1A2E" : "transparent",
                            borderRadius: "2px",
                            flexShrink: 0,
                          }}
                        />
                        ${min} – ${max === 800 ? "800+" : max}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[rgba(0,0,0,0.06)]">
                <button
                  onClick={() => {
                    setCategory("All");
                    setPriceRange([0, 800]);
                    setFilterOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "13px",
                    background: "#1A1A2E",
                    color: "white",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="uppercase"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
