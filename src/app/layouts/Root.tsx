import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CartProvider } from "../context/CartContext";

export default function Root() {
  return (
    <CartProvider>
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <ScrollRestoration />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
