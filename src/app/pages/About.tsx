import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Leaf, Recycle, Heart } from "lucide-react";

const ABOUT_HERO =
  "https://images.unsplash.com/photo-1706472715692-c2ea61a99a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29tZW4lMjBkcmVzcyUyMGJvdXRpcXVlJTIwc3R1ZGlvfGVufDF8fHx8MTc3MjEzNTcwNnww&ixlib=rb-4.1.0&q=80&w=1080";

const STORE_IMAGE =
  "https://images.unsplash.com/photo-1768039049614-f3c2bae3f1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvciUyMHdoaXRlJTIwY2xlYW58ZW58MXx8fHwxNzcyMTM1NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const values = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description:
      "Every fabric we source meets rigorous environmental standards. We prioritize organic, recycled, and low-impact materials in all our collections.",
  },
  {
    icon: Recycle,
    title: "Circular Fashion",
    description:
      "We design for longevity. Our Take-Back programme allows customers to return worn OLIVÉ pieces for restyling or responsible recycling.",
  },
  {
    icon: Heart,
    title: "Ethical Production",
    description:
      "We partner exclusively with certified artisan workshops that provide fair wages, safe conditions, and dignified work to every maker.",
  },
];

export default function About() {
  return (
    <div style={{ background: "#FAFAFC" }}>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={ABOUT_HERO}
          alt="OLIVÉ Story"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(26,26,46,0.65) 0%, rgba(0,0,0,0.1) 100%)" }}
        />
        <div className="relative h-full flex items-center px-8 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.6)",
              }}
              className="uppercase mb-4"
            >
              Our Story
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: "1.05",
                maxWidth: "600px",
              }}
            >
              Fashion with a
              <br />
              <em style={{ fontStyle: "italic" }}>quiet confidence</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
                letterSpacing: "0.25em",
                color: "#9A9AAD",
              }}
              className="uppercase mb-4"
            >
              Founded 2018
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#1A1A2E",
                lineHeight: "1.2",
                marginBottom: "28px",
              }}
            >
              A brand born from a love of clothes that <em style={{ fontStyle: "italic" }}>actually last</em>.
            </h2>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#5A5A72",
                fontSize: "0.85rem",
                lineHeight: "2",
                letterSpacing: "0.02em",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <p>
                Olivia started this brand in Paris in 2018 with a simple frustration: she couldn't find clothes that felt genuinely luxurious, lasted more than a season, and were made with real care for the people and planet behind them.
              </p>
              <p>
                So she built OLIVÉ — a house where every piece begins with the question: "Will this still be beautiful in ten years?" Our answer has always been yes, because we refuse to compromise on fabric quality, construction, or craftsmanship.
              </p>
              <p>
                Today, OLIVÉ is worn by women in 42 countries who believe that true style has nothing to do with what's trending. It's about knowing who you are, and dressing accordingly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src={STORE_IMAGE}
              alt="OLIVÉ Atelier"
              className="w-full object-cover"
              style={{ aspectRatio: "4/5" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                right: "-16px",
                background: "#F3F3F7",
                border: "1px solid #DCDCE4",
                padding: "24px 28px",
                maxWidth: "200px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  color: "#1A1A2E",
                  lineHeight: "1",
                }}
              >
                42
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: "#9A9AAD",
                  marginTop: "6px",
                }}
                className="uppercase"
              >
                Countries worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#1A1A2E" }} className="py-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { number: "2018", label: "Year Founded" },
              { number: "42+", label: "Countries" },
              { number: "850+", label: "Products" },
              { number: "100%", label: "Ethical Production" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 300,
                    color: "white",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.number}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "6px",
                  }}
                  className="uppercase"
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: "#F3F3F7" }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
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
              What We Stand For
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#1A1A2E",
              }}
            >
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{
                  background: "white",
                  padding: "36px 32px",
                  border: "1px solid #DCDCE4",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #DCDCE4",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <value.icon size={18} color="#1A1A2E" strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "#1A1A2E",
                    marginBottom: "12px",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#6A6A82",
                    fontSize: "0.82rem",
                    lineHeight: "1.85",
                  }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 text-center" style={{ background: "#FAFAFC" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#1A1A2E",
              marginBottom: "16px",
            }}
          >
            Explore the Collection
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6A6A82",
              fontSize: "0.83rem",
              lineHeight: "1.8",
              marginBottom: "28px",
            }}
          >
            Timeless pieces, crafted with intention. Discover the full OLIVÉ collection.
          </p>
          <Link
            to="/shop"
            style={{
              background: "#1A1A2E",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              padding: "15px 40px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="uppercase hover:bg-[#2C2C48] transition-colors"
          >
            Shop Now <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
