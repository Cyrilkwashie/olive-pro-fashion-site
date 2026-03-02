export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  hoverImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Silk Slip Dress",
    price: 298,
    category: "Dresses",
    description:
      "Cut from the finest silk charmeuse, this slip dress drapes effortlessly over the body. The minimalist silhouette is elevated by a barely-there bias cut and delicate adjustable straps.",
    details: [
      "100% Silk Charmeuse",
      "Bias cut construction",
      "Adjustable spaghetti straps",
      "Side zip closure",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Champagne", hex: "#D4C5A9" },
      { name: "Slate", hex: "#8FA3B1" },
    ],
    image:
      "https://images.unsplash.com/photo-1762605135012-56a59a059e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tZW4lMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbWluaW1hbHxlbnwxfHx8fDE3NzIxMzU3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: true,
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: "p2",
    name: "Structured Blazer",
    price: 485,
    category: "Jackets",
    description:
      "A refined take on the classic blazer, tailored in premium wool blend fabric. Sharp shoulders and a nipped waist create a powerful silhouette perfect for any occasion.",
    details: [
      "70% Wool, 30% Polyester blend",
      "Single-button fastening",
      "Two flap pockets",
      "Fully lined",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Light Grey", hex: "#C8C8D0" },
      { name: "Charcoal", hex: "#3A3A48" },
    ],
    image:
      "https://images.unsplash.com/photo-1715408153725-186c6c77fb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGJsYXplciUyMGNvYXQlMjBjaGljJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzIxMzU3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviewCount: 84,
  },
  {
    id: "p3",
    name: "Cashmere Knit",
    price: 345,
    originalPrice: 420,
    category: "Knitwear",
    description:
      "Indulge in pure luxury with this cashmere knit sweater. Soft, warm, and endlessly versatile, it's the piece you'll reach for every single day of the season.",
    details: [
      "100% Grade A Cashmere",
      "Relaxed oversized fit",
      "Ribbed hem and cuffs",
      "Hand wash recommended",
      "Available in 5 colors",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal", hex: "#D9C9B0" },
      { name: "Silver", hex: "#B8BAC4" },
      { name: "Blush", hex: "#E8C4B8" },
    ],
    image:
      "https://images.unsplash.com/photo-1677779817420-b3ad7a4a1f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0d2VhciUyMHN3ZWF0ZXIlMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwYmVpZ2V8ZW58MXx8fHwxNzcyMTM1NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    isSale: true,
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "p4",
    name: "Pleated Midi Skirt",
    price: 225,
    category: "Skirts",
    description:
      "This flowing pleated midi skirt moves with every step. Crafted from lightweight crepe fabric, it strikes the perfect balance between refined and effortless.",
    details: [
      "100% Crepe Fabric",
      "Knife pleats throughout",
      "Elasticated waistband",
      "Falls to midi length",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Sage", hex: "#9DB5A0" },
      { name: "Dusty Mauve", hex: "#C4A8B0" },
    ],
    image:
      "https://images.unsplash.com/photo-1706188458155-f2803026b3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHNraXJ0JTIwcGxlYXRlZCUyMG1pZGklMjBlbGVnYW50fGVufDF8fHx8MTc3MjEzNTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: true,
    rating: 4.6,
    reviewCount: 56,
  },
  {
    id: "p5",
    name: "Silk Blouse",
    price: 265,
    category: "Tops",
    description:
      "An impeccably crafted silk blouse that transitions seamlessly from desk to dinner. The softly draped collar adds an air of refinement to the classic shirt silhouette.",
    details: [
      "100% Silk",
      "Relaxed collar",
      "Mother-of-pearl buttons",
      "Relaxed fit",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#F8F8F8" },
      { name: "Pale Blue", hex: "#C5D5E0" },
      { name: "Champagne", hex: "#E8DCC8" },
    ],
    image:
      "https://images.unsplash.com/photo-1770294758942-7ce9ca052986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHNpbGslMjBibG91c2UlMjBlbGVnYW50JTIwd2hpdGUlMjBzdHVkaW98ZW58MXx8fHwxNzcyMTM1NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviewCount: 92,
  },
  {
    id: "p6",
    name: "Wide-Leg Trousers",
    price: 295,
    category: "Trousers",
    description:
      "These wide-leg trousers redefine relaxed tailoring. Cut from a fluid fabric that skims the body in all the right places, they pair effortlessly with almost anything in your wardrobe.",
    details: [
      "Viscose blend fabric",
      "High-rise waist",
      "Wide-leg silhouette",
      "Side pockets",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ecru", hex: "#EDE8DC" },
      { name: "Stone", hex: "#C4BAA8" },
      { name: "Black", hex: "#1C1C1C" },
    ],
    image:
      "https://images.unsplash.com/photo-1687276154818-d555a7b337ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjB0cm91c2VycyUyMG1pbmltYWxpc3QlMjBncmV5fGVufDF8fHx8MTc3MjEzNTcwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviewCount: 148,
  },
  {
    id: "p7",
    name: "Linen Summer Dress",
    price: 235,
    category: "Dresses",
    description:
      "This airy linen dress embodies the spirit of effortless summer style. The relaxed silhouette and breathable fabric make it your go-to piece from morning to evening.",
    details: [
      "100% Belgian Linen",
      "V-neckline",
      "Loose, relaxed fit",
      "Side pockets",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Natural", hex: "#E8DFC8" },
      { name: "White", hex: "#F8F8F8" },
      { name: "Terracotta", hex: "#C07858" },
    ],
    image:
      "https://images.unsplash.com/photo-1623421536531-44b051d7e0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxpbmVuJTIwc3VtbWVyJTIwZHJlc3MlMjBuZXV0cmFsJTIwdG9uZXN8ZW58MXx8fHwxNzcyMTM1NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: true,
    rating: 4.9,
    reviewCount: 71,
  },
  {
    id: "p8",
    name: "Trench Coat",
    price: 595,
    originalPrice: 750,
    category: "Jackets",
    description:
      "The definitive outerwear piece. Our reimagined trench coat is crafted from water-resistant cotton gabardine, with classic details updated for a contemporary, streamlined silhouette.",
    details: [
      "Cotton Gabardine",
      "Double-breasted front",
      "Adjustable belt",
      "Storm flap detail",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#C8A878" },
      { name: "Light Beige", hex: "#E0D0B8" },
      { name: "Black", hex: "#1C1C1C" },
    ],
    image:
      "https://images.unsplash.com/photo-1771197933092-e6c85ab781c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMG92ZXJjb2F0JTIwdHJlbmNoJTIwY29hdCUyMHN0cmVldCUyMHN0eWxlfGVufDF8fHx8MTc3MjEzNTcxNHww&ixlib=rb-4.1.0&q=80&w=1080",
    isSale: true,
    rating: 4.9,
    reviewCount: 165,
  },
];

export const categories = [
  { name: "Dresses", count: 24 },
  { name: "Tops", count: 18 },
  { name: "Trousers", count: 15 },
  { name: "Skirts", count: 12 },
  { name: "Jackets", count: 10 },
  { name: "Knitwear", count: 14 },
];
