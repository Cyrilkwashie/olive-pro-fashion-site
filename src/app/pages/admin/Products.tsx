import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Product } from "../../data/products";

type FormData = Omit<Product, "id" | "colors" | "details" | "sizes"> & {
  colorsRaw: string;   // comma-separated "Name:#hex" pairs
  detailsRaw: string;  // comma-separated strings
  sizesRaw: string;    // comma-separated strings
};

const EMPTY_FORM: FormData = {
  name: "",
  price: 0,
  originalPrice: undefined,
  category: "",
  description: "",
  detailsRaw: "",
  sizesRaw: "XS, S, M, L, XL",
  colorsRaw: "",
  image: "",
  hoverImage: "",
  isNew: false,
  isSale: false,
  rating: 5,
  reviewCount: 0,
};

const CATEGORIES = ["Dresses", "Tops", "Trousers", "Skirts", "Jackets", "Knitwear", "Accessories"];

function productToForm(p: Product): FormData {
  return {
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    category: p.category,
    description: p.description,
    detailsRaw: p.details.join(", "),
    sizesRaw: p.sizes.join(", "),
    colorsRaw: p.colors.map((c) => `${c.name}:${c.hex}`).join(", "),
    image: p.image,
    hoverImage: p.hoverImage ?? "",
    isNew: p.isNew ?? false,
    isSale: p.isSale ?? false,
    rating: p.rating,
    reviewCount: p.reviewCount,
  };
}

function formToProduct(f: FormData, id: string): Product {
  return {
    id,
    name: f.name.trim(),
    price: Number(f.price),
    originalPrice: f.originalPrice ? Number(f.originalPrice) : undefined,
    category: f.category,
    description: f.description.trim(),
    details: f.detailsRaw.split(",").map((s) => s.trim()).filter(Boolean),
    sizes: f.sizesRaw.split(",").map((s) => s.trim()).filter(Boolean),
    colors: f.colorsRaw.split(",").map((s) => {
      const [name, hex] = s.trim().split(":");
      return { name: name?.trim() ?? "", hex: hex?.trim() ?? "#000000" };
    }).filter((c) => c.name),
    image: f.image.trim(),
    hoverImage: f.hoverImage?.trim() || undefined,
    isNew: f.isNew,
    isSale: f.isSale,
    rating: Number(f.rating),
    reviewCount: Number(f.reviewCount),
  };
}

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  function openAdd() {
    setForm(EMPTY_FORM);
    setSelectedProduct(null);
    setModal("add");
  }

  function openEdit(p: Product) {
    setForm(productToForm(p));
    setSelectedProduct(p);
    setModal("edit");
  }

  function openDelete(id: string) {
    setDeleteId(id);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setSelectedProduct(null);
    setDeleteId(null);
  }

  function handleSubmit() {
    if (modal === "add") {
      addProduct(formToProduct(form, "") as Omit<Product, "id">);
    } else if (modal === "edit" && selectedProduct) {
      updateProduct(formToProduct(form, selectedProduct.id));
    }
    closeModal();
  }

  function handleDelete() {
    if (deleteId) deleteProduct(deleteId);
    closeModal();
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    background: "#FAFAFC",
    boxSizing: "border-box",
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#030213", margin: 0 }}>Products</h1>
          <p style={{ color: "#7A7A96", fontSize: 14, marginTop: 4 }}>
            {products.length} products total
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{
            background: "#030213",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Product
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...fieldStyle, maxWidth: 280, flex: "1 1 160px" }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ ...fieldStyle, width: "auto", minWidth: 140, cursor: "pointer" }}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAFC" }}>
                {["Product", "Category", "Price", "Rating", "Tags", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#7A7A96", letterSpacing: "0.03em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#7A7A96", fontSize: 14 }}>
                    No products found.
                  </td>
                </tr>
              )}
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.05)", transition: "background 0.1s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFC")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img src={p.image} alt={p.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#030213" }}>{p.name}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#7A7A96" }}>{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#7A7A96" }}>{p.category}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#030213", whiteSpace: "nowrap" }}>
                    ${p.price}
                    {p.originalPrice && (
                      <span style={{ color: "#7A7A96", fontWeight: 400, textDecoration: "line-through", marginLeft: 6 }}>
                        ${p.originalPrice}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#030213" }}>
                    ★ {p.rating} <span style={{ color: "#7A7A96" }}>({p.reviewCount})</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {p.isNew && <Tag label="New" bg="#D1FAE5" color="#065F46" />}
                      {p.isSale && <Tag label="Sale" bg="#FEE2E2" color="#991B1B" />}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <ActionBtn label="Edit" onClick={() => openEdit(p)} />
                      <ActionBtn label="Delete" onClick={() => openDelete(p.id)} danger />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <Overlay onClose={closeModal}>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              width: "100%",
              maxWidth: 620,
              maxHeight: "90vh",
              overflow: "auto",
              padding: 28,
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#030213", margin: "0 0 20px" }}>
              {modal === "add" ? "Add Product" : "Edit Product"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <FieldGroup label="Product Name" required>
                <input style={fieldStyle} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </FieldGroup>
              <FieldGroup label="Category" required>
                <select style={fieldStyle} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Price ($)" required>
                <input type="number" style={fieldStyle} value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: +e.target.value }))} />
              </FieldGroup>
              <FieldGroup label="Original Price ($)">
                <input type="number" style={fieldStyle} value={form.originalPrice ?? ""} onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value ? +e.target.value : undefined }))} />
              </FieldGroup>
              <FieldGroup label="Rating (0-5)">
                <input type="number" min={0} max={5} step={0.1} style={fieldStyle} value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: +e.target.value }))} />
              </FieldGroup>
              <FieldGroup label="Review Count">
                <input type="number" style={fieldStyle} value={form.reviewCount} onChange={(e) => setForm((f) => ({ ...f, reviewCount: +e.target.value }))} />
              </FieldGroup>
            </div>

            <div style={{ marginTop: 14 }}>
              <FieldGroup label="Description" required>
                <textarea rows={3} style={{ ...fieldStyle, resize: "vertical" }} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </FieldGroup>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
              <FieldGroup label="Sizes (comma-separated)">
                <input style={fieldStyle} value={form.sizesRaw} onChange={(e) => setForm((f) => ({ ...f, sizesRaw: e.target.value }))} placeholder="XS, S, M, L, XL" />
              </FieldGroup>
              <FieldGroup label="Details (comma-separated)">
                <input style={fieldStyle} value={form.detailsRaw} onChange={(e) => setForm((f) => ({ ...f, detailsRaw: e.target.value }))} placeholder="100% Silk, …" />
              </FieldGroup>
            </div>

            <div style={{ marginTop: 14 }}>
              <FieldGroup label="Colors (Name:#hex, comma-separated)">
                <input style={fieldStyle} value={form.colorsRaw} onChange={(e) => setForm((f) => ({ ...f, colorsRaw: e.target.value }))} placeholder="Ivory:#F5F0E8, Black:#1C1C1C" />
              </FieldGroup>
            </div>

            <div style={{ marginTop: 14 }}>
              <FieldGroup label="Image URL" required>
                <input style={fieldStyle} value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://…" />
              </FieldGroup>
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" checked={form.isNew} onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.checked }))} />
                Mark as New
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" checked={form.isSale} onChange={(e) => setForm((f) => ({ ...f, isSale: e.target.checked }))} />
                Mark as Sale
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
              <button onClick={closeModal} style={{ padding: "9px 18px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, background: "#fff", fontSize: 13, cursor: "pointer" }}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.category || !form.price || !form.image}
                style={{
                  padding: "9px 18px",
                  border: "none",
                  borderRadius: 8,
                  background: "#030213",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: (!form.name || !form.category || !form.price || !form.image) ? 0.5 : 1,
                }}
              >
                {modal === "add" ? "Add Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* Delete Confirmation Modal */}
      {modal === "delete" && (
        <Overlay onClose={closeModal}>
          <div
            style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 400, padding: 28, boxSizing: "border-box" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#030213", margin: "0 0 10px" }}>Delete Product</h2>
            <p style={{ color: "#7A7A96", fontSize: 14, margin: "0 0 24px" }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={closeModal} style={{ padding: "9px 18px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, background: "#fff", fontSize: 13, cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleDelete} style={{ padding: "9px 18px", border: "none", borderRadius: 8, background: "#d4183d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function Tag({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 600, background: bg, color }}>
      {label}
    </span>
  );
}

function ActionBtn({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px",
        border: `1px solid ${danger ? "#FCA5A5" : "rgba(0,0,0,0.12)"}`,
        borderRadius: 7,
        background: danger ? "#FEF2F2" : "#FAFAFC",
        color: danger ? "#991B1B" : "#1A1A2E",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        transition: "opacity 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#7A7A96", marginBottom: 5, letterSpacing: "0.03em", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: "#d4183d" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
