import { useState } from "react";
import { Link } from "react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[1] || product.sizes[0], product.colors[0].name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4", background: "#F0F0F4" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span
                style={{
                  background: "#1A1A2E",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  padding: "3px 8px",
                  color: "white",
                }}
                className="uppercase"
              >
                New
              </span>
            )}
            {product.isSale && (
              <span
                style={{
                  background: "#C87060",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  padding: "3px 8px",
                  color: "white",
                }}
                className="uppercase"
              >
                Sale
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlist((w) => !w);
            }}
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart
              size={14}
              strokeWidth={1.5}
              fill={wishlist ? "#C87060" : "none"}
              stroke={wishlist ? "#C87060" : "#1A1A2E"}
            />
          </button>

          {/* Quick add button */}
          <motion.button
            onClick={handleQuickAdd}
            initial={false}
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: added ? "#3A3A54" : "rgba(26, 26, 46, 0.92)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "white",
              padding: "14px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            className="uppercase"
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            {added ? "Added to Bag" : "Quick Add"}
          </motion.button>
        </div>

        {/* Product info */}
        <div className="mt-3.5 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "#9A9AAD",
                }}
                className="uppercase mb-1"
              >
                {product.category}
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  color: "#1A1A2E",
                  letterSpacing: "0.02em",
                }}
              >
                {product.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              {product.originalPrice && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "#AFAFBE",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.originalPrice}
                </p>
              )}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: product.isSale ? "#C87060" : "#1A1A2E",
                  fontWeight: 400,
                }}
              >
                ${product.price}
              </p>
            </div>
          </div>

          {/* Color swatches */}
          <div className="flex gap-1.5 mt-2.5">
            {product.colors.map((color) => (
              <div
                key={color.name}
                title={color.name}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: color.hex,
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
