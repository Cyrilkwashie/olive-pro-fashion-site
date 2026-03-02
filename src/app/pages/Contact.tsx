import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyle = {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #DCDCE4",
    background: "transparent",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.85rem",
    color: "#1A1A2E",
    padding: "10px 0",
    outline: "none",
    letterSpacing: "0.02em",
    transition: "border-color 0.2s ease",
  };

  return (
    <div style={{ background: "#FAFAFC", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{ background: "#F3F3F7", borderBottom: "1px solid #DCDCE4" }}
        className="py-16 px-6 lg:px-12"
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
              Get in Touch
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#1A1A2E",
              }}
            >
              Contact Us
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-12"
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: 300,
                  color: "#1A1A2E",
                  marginBottom: "14px",
                  lineHeight: "1.2",
                }}
              >
                We'd love to
                <br />
                <em style={{ fontStyle: "italic" }}>hear from you.</em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6A6A82",
                  fontSize: "0.83rem",
                  lineHeight: "1.9",
                  letterSpacing: "0.02em",
                }}
              >
                Whether you have a question about sizing, an order, or simply want to say hello — our team is here and happy to help.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@olivefashion.com",
                  sub: "We reply within 24 hours",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (800) 654-9870",
                  sub: "Mon–Fri, 9am–6pm EST",
                },
                {
                  icon: MapPin,
                  label: "Showroom",
                  value: "12 Rue du Faubourg, Paris",
                  sub: "By appointment only",
                },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      border: "1px solid #DCDCE4",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Icon size={14} color="#1A1A2E" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.18em",
                        color: "#9A9AAD",
                        marginBottom: "3px",
                      }}
                      className="uppercase"
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem",
                        color: "#1A1A2E",
                      }}
                    >
                      {value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.73rem",
                        color: "#9A9AAD",
                        marginTop: "2px",
                      }}
                    >
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#DCDCE4" }} />

            {/* Social */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  color: "#9A9AAD",
                  marginBottom: "14px",
                }}
                className="uppercase"
              >
                Follow Along
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: "@olive.fashion" },
                  { icon: Facebook, label: "OLIVÉ" },
                  { icon: Twitter, label: "@olivefashion" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.73rem",
                      color: "#6A6A82",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    className="hover:text-[#1A1A2E] transition-colors"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  border: "1px solid #DCDCE4",
                  background: "white",
                  padding: "52px 40px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: "1px solid #DCDCE4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <Mail size={22} color="#3A8C6A" strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#1A1A2E",
                    marginBottom: "10px",
                  }}
                >
                  Message Sent
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#6A6A82",
                    fontSize: "0.83rem",
                    lineHeight: "1.8",
                    maxWidth: "340px",
                    margin: "0 auto 28px",
                  }}
                >
                  Thank you for reaching out. A member of our team will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    color: "#1A1A2E",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  className="uppercase hover:opacity-60 transition-opacity"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  border: "1px solid #DCDCE4",
                  background: "white",
                  padding: "44px 40px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "#1A1A2E",
                    marginBottom: "32px",
                  }}
                >
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                  {/* Name */}
                  <div>
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.18em",
                        color: "#9A9AAD",
                        display: "block",
                        marginBottom: "6px",
                      }}
                      className="uppercase"
                    >
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Olivia Smith"
                      style={inputStyle}
                      className="focus:border-[#1A1A2E] placeholder:text-[#DCDCE4]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.18em",
                        color: "#9A9AAD",
                        display: "block",
                        marginBottom: "6px",
                      }}
                      className="uppercase"
                    >
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="hello@example.com"
                      style={inputStyle}
                      className="focus:border-[#1A1A2E] placeholder:text-[#DCDCE4]"
                    />
                  </div>

                  {/* Subject */}
                  <div className="md:col-span-2">
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.18em",
                        color: "#9A9AAD",
                        display: "block",
                        marginBottom: "6px",
                      }}
                      className="uppercase"
                    >
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                      className="focus:border-[#1A1A2E]"
                    >
                      <option value="" disabled>Select a topic…</option>
                      <option value="order">Order Enquiry</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="sizing">Sizing Advice</option>
                      <option value="wholesale">Wholesale & Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.18em",
                        color: "#9A9AAD",
                        display: "block",
                        marginBottom: "6px",
                      }}
                      className="uppercase"
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      style={{
                        ...inputStyle,
                        borderBottom: "none",
                        border: "1px solid #DCDCE4",
                        padding: "14px",
                        resize: "none",
                        marginTop: "4px",
                      }}
                      className="focus:border-[#1A1A2E] placeholder:text-[#DCDCE4]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#DCDCE4]">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "#9A9AAD",
                    }}
                  >
                    * Required fields
                  </p>
                  <button
                    type="submit"
                    style={{
                      background: "#1A1A2E",
                      color: "white",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      padding: "14px 32px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    className="uppercase hover:bg-[#2C2C48] transition-colors"
                  >
                    Send Message <ArrowRight size={12} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}

            {/* FAQ teaser */}
            <div
              style={{
                marginTop: "20px",
                background: "#F3F3F7",
                border: "1px solid #DCDCE4",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "#1A1A2E",
                    fontWeight: 500,
                  }}
                >
                  Looking for quick answers?
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.73rem",
                    color: "#9A9AAD",
                    marginTop: "3px",
                  }}
                >
                  Browse our FAQ for instant help on orders, sizing & returns.
                </p>
              </div>
              <button
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  color: "#1A1A2E",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #1A1A2E",
                  paddingBottom: "2px",
                }}
                className="uppercase hover:opacity-60 transition-opacity"
              >
                View FAQs <ArrowRight size={11} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
