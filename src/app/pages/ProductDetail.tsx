import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft, Star, ChevronDown } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAFC" }}>
        <div className="text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#AFAFBE" }}>
            Product not found
          </p>
          <Link
            to="/shop"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#1A1A2E", letterSpacing: "0.12em", textDecoration: "none", marginTop: "16px", display: "block" }}
            className="uppercase hover:opacity-60 transition-opacity"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }
    addToCart(product, selectedSize, selectedColor || product.colors[0].name, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: "#FAFAFC", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{ borderBottom: "1px solid #DCDCE4" }}
        className="px-6 lg:px-12 py-4"
      >
        <div className="max-w-[1400px] mx-auto">
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              color: "#9A9AAD",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Link to="/" style={{ color: "#9A9AAD", textDecoration: "none" }} className="hover:text-[#1A1A2E] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" style={{ color: "#9A9AAD", textDecoration: "none" }} className="hover:text-[#1A1A2E] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span style={{ color: "#1A1A2E" }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <Link
          to="/shop"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: "#6A6A82",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "32px",
          }}
          className="uppercase hover:text-[#1A1A2E] transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "3/4", background: "#F0F0F4" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.isSale && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "#C87060",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    padding: "4px 10px",
                    color: "white",
                  }}
                  className="uppercase"
                >
                  Sale
                </div>
              )}
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Category & Name */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "#9A9AAD",
              }}
              className="uppercase mb-2"
            >
              {product.category}
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: "#1A1A2E",
                letterSpacing: "0.02em",
                lineHeight: "1.15",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {Array(5).fill(null).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < Math.round(product.rating) ? "#C8A060" : "none"}
                    stroke={i < Math.round(product.rating) ? "#C8A060" : "#DCDCE4"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#9A9AAD" }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-5">
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.35rem",
                  color: product.isSale ? "#C87060" : "#1A1A2E",
                  fontWeight: 400,
                }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "#AFAFBE",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div style={{ height: "1px", background: "#DCDCE4", margin: "24px 0" }} />

            {/* Color selection */}
            <div className="mb-6">
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "#1A1A2E",
                  marginBottom: "12px",
                }}
                className="uppercase"
              >
                Color:{" "}
                <span style={{ color: "#6A6A82", fontWeight: 400 }}>
                  {selectedColor || product.colors[0].name}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: color.hex,
                      border: (selectedColor === color.name || (!selectedColor && color === product.colors[0]))
                        ? "2px solid #1A1A2E"
                        : "1px solid rgba(0,0,0,0.12)",
                      cursor: "pointer",
                      outline: (selectedColor === color.name || (!selectedColor && color === product.colors[0]))
                        ? "2px solid #FAFAFC"
                        : "none",
                      outlineOffset: "1px",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    color: sizeError ? "#C87060" : "#1A1A2E",
                  }}
                  className="uppercase"
                >
                  {sizeError ? "Please select a size" : "Size"}
                </p>
                <button
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    color: "#9A9AAD",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      padding: "8px 18px",
                      border: selectedSize === size
                        ? "1px solid #1A1A2E"
                        : sizeError
                        ? "1px solid #C87060"
                        : "1px solid #DCDCE4",
                      background: selectedSize === size ? "#1A1A2E" : "transparent",
                      color: selectedSize === size ? "white" : "#3A3A54",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to cart */}
            <div className="flex gap-3 mb-5">
              {/* Qty */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #DCDCE4",
                  background: "white",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{ padding: "12px 14px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <Minus size={13} color="#1A1A2E" strokeWidth={1.5} />
                </button>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "#1A1A2E",
                    minWidth: "28px",
                    textAlign: "center",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{ padding: "12px 14px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <Plus size={13} color="#1A1A2E" strokeWidth={1.5} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  background: added ? "#3A8C6A" : "#1A1A2E",
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "16px",
                  transition: "background 0.3s ease",
                }}
                className="uppercase"
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                {added ? "Added to Bag ✓" : "Add to Bag"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlist((w) => !w)}
                style={{
                  padding: "16px",
                  border: "1px solid #DCDCE4",
                  background: "white",
                  cursor: "pointer",
                }}
                className="hover:border-[#1A1A2E] transition-colors"
              >
                <Heart
                  size={17}
                  strokeWidth={1.5}
                  fill={wishlist ? "#C87060" : "none"}
                  stroke={wishlist ? "#C87060" : "#1A1A2E"}
                />
              </button>
            </div>

            {/* Shipping note */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.73rem",
                color: "#9A9AAD",
                letterSpacing: "0.03em",
              }}
            >
              Free shipping on orders over $250 · Free returns within 30 days
            </p>

            <div style={{ height: "1px", background: "#DCDCE4", margin: "24px 0" }} />

            {/* Description */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#5A5A72",
                fontSize: "0.83rem",
                lineHeight: "1.9",
                letterSpacing: "0.02em",
              }}
            >
              {product.description}
            </p>

            {/* Details accordion */}
            <div style={{ borderTop: "1px solid #DCDCE4", marginTop: "24px" }}>
              <button
                onClick={() => setDetailsOpen((d) => !d)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "16px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "#1A1A2E",
                }}
                className="uppercase"
              >
                Product Details
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  style={{ transform: detailsOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }}
                />
              </button>
              {detailsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <ul
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: "#5A5A72",
                      lineHeight: "2",
                      paddingBottom: "16px",
                      paddingLeft: "16px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {product.details.map((d, i) => (
                      <li key={i} style={{ listStyleType: "disc" }}>{d}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div style={{ height: "1px", background: "#DCDCE4" }} className="mb-12" />
            <div className="flex items-end justify-between mb-10">
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    color: "#9A9AAD",
                  }}
                  className="uppercase mb-2"
                >
                  You May Also Like
                </p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#1A1A2E",
                  }}
                >
                  Complete the Look
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
