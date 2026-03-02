import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft, Truck, RotateCcw, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = subtotal >= 250 ? 0 : 15;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;

  const handlePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toLowerCase() === "olive10") {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#FAFAFC" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "1px solid #DCDCE4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <ShoppingBag size={24} color="#3A8C6A" strokeWidth={1.5} />
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.2rem",
              fontWeight: 300,
              color: "#1A1A2E",
              marginBottom: "12px",
            }}
          >
            Order Confirmed
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6A6A82",
              fontSize: "0.83rem",
              lineHeight: "1.8",
              marginBottom: "32px",
            }}
          >
            Thank you for your order. We'll send you a confirmation email shortly. Your pieces will be thoughtfully packaged and on their way soon.
          </p>
          <Link
            to="/shop"
            style={{
              background: "#1A1A2E",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              padding: "14px 32px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="uppercase"
          >
            Continue Shopping <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAFC", minHeight: "100vh" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-center justify-between mb-10">
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
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 300,
                color: "#1A1A2E",
              }}
            >
              Your Bag
            </h1>
          </div>
          <Link
            to="/shop"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: "#6A6A82",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="uppercase hover:text-[#1A1A2E] transition-colors"
          >
            <ArrowLeft size={12} strokeWidth={1.5} /> Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-28 text-center"
          >
            <ShoppingBag size={40} color="#DCDCE4" strokeWidth={1} className="mx-auto mb-6" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 300,
                color: "#AFAFBE",
                marginBottom: "16px",
              }}
            >
              Your bag is empty
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#9A9AAD",
                fontSize: "0.82rem",
                marginBottom: "32px",
              }}
            >
              Discover our new collection of timeless pieces
            </p>
            <Link
              to="/shop"
              style={{
                background: "#1A1A2E",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                padding: "14px 32px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              className="uppercase"
            >
              Shop Now <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div style={{ borderTop: "1px solid #DCDCE4" }}>
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      style={{ borderBottom: "1px solid #DCDCE4" }}
                      className="py-7 flex gap-5"
                    >
                      <Link to={`/product/${item.product.id}`} className="shrink-0">
                        <div style={{ width: "100px", height: "130px", background: "#F0F0F4", overflow: "hidden" }}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <p
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.62rem",
                                letterSpacing: "0.14em",
                                color: "#9A9AAD",
                              }}
                              className="uppercase mb-1"
                            >
                              {item.product.category}
                            </p>
                            <Link
                              to={`/product/${item.product.id}`}
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "1.1rem",
                                fontWeight: 400,
                                color: "#1A1A2E",
                                textDecoration: "none",
                              }}
                              className="hover:opacity-70 transition-opacity"
                            >
                              {item.product.name}
                            </Link>
                            <p
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.73rem",
                                color: "#9A9AAD",
                                marginTop: "4px",
                              }}
                            >
                              Size: {item.size} · Color: {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="p-1 hover:opacity-50 transition-opacity ml-2"
                          >
                            <X size={14} color="#9A9AAD" strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              border: "1px solid #DCDCE4",
                              background: "white",
                            }}
                          >
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              style={{ padding: "6px 11px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Minus size={11} color="#1A1A2E" strokeWidth={1.5} />
                            </button>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.8rem",
                                color: "#1A1A2E",
                                minWidth: "22px",
                                textAlign: "center",
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              style={{ padding: "6px 11px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Plus size={11} color="#1A1A2E" strokeWidth={1.5} />
                            </button>
                          </div>

                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.9rem",
                              color: "#1A1A2E",
                            }}
                          >
                            ${(item.product.price * item.quantity).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div
                style={{
                  border: "1px solid #DCDCE4",
                  padding: "28px",
                  background: "white",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "#1A1A2E",
                    marginBottom: "20px",
                  }}
                >
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#6A6A82" }}>
                      Subtotal
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#1A1A2E" }}>
                      ${subtotal}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#3A8C6A" }}>
                        Promo (10%)
                      </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#3A8C6A" }}>
                        −${discount}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#6A6A82" }}>
                      Shipping
                    </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: shipping === 0 ? "#3A8C6A" : "#1A1A2E" }}>
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#9A9AAD" }}>
                      Free shipping on orders over $250
                    </p>
                  )}
                </div>

                <div style={{ height: "1px", background: "#DCDCE4", margin: "16px 0" }} />

                <div className="flex justify-between mb-6">
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "#1A1A2E",
                      fontWeight: 500,
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1A1A2E",
                    }}
                  >
                    ${total}
                  </span>
                </div>

                {/* Promo code */}
                {!promoApplied && (
                  <form onSubmit={handlePromo} className="flex mb-5 gap-0">
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      style={{
                        flex: 1,
                        border: "1px solid #DCDCE4",
                        borderRight: "none",
                        padding: "10px 14px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        background: "#F8F8FB",
                        outline: "none",
                        color: "#1A1A2E",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        border: "1px solid #DCDCE4",
                        padding: "10px 16px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        background: "#F3F3F7",
                        color: "#1A1A2E",
                        cursor: "pointer",
                      }}
                      className="uppercase hover:bg-[#EBEBEF] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoApplied && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#3A8C6A", marginBottom: "16px" }}>
                    ✓ Promo code applied — 10% off
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  style={{
                    width: "100%",
                    background: "#1A1A2E",
                    color: "white",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  className="uppercase hover:bg-[#2C2C48] transition-colors"
                >
                  Proceed to Checkout <ArrowRight size={12} strokeWidth={1.5} />
                </button>

                {/* Trust badges */}
                <div className="mt-6 space-y-2.5">
                  {[
                    { icon: Truck, text: "Free shipping over $250" },
                    { icon: RotateCcw, text: "Free returns within 30 days" },
                    { icon: Shield, text: "Secure checkout" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <Icon size={13} color="#9A9AAD" strokeWidth={1.5} />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.72rem",
                          color: "#9A9AAD",
                        }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
