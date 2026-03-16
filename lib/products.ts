import type { Category, Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "prod-essential-tee",
    slug: "essential-tee",
    name: "Essential Tee",
    category: "t-shirt",
    collectionLabel: "CORE UNIFORM",
    priceCents: 5800,
    shortDescription:
      "A clean everyday tee with a structured drape and a polished finish for the retail demo floor.",
    fit: "Straight relaxed fit",
    material: "Compact cotton jersey",
    imageSrc: "/products/essential-tee-v2.png",
    alt: "A soft white t-shirt against a light gray studio background.",
  },
  {
    id: "prod-archive-graphic-tee",
    slug: "archive-graphic-tee",
    name: "Archive Graphic Tee",
    category: "t-shirt",
    collectionLabel: "GRAPHIC RELEASE",
    priceCents: 6400,
    shortDescription:
      "A statement tee with crisp front artwork and a boxy silhouette designed to feel collectible.",
    fit: "Boxy cropped fit",
    material: "Midweight cotton jersey",
    imageSrc: "/products/archive-graphic-tee-v2.png",
    alt: "A washed charcoal graphic t-shirt on a neutral background.",
  },
  {
    id: "prod-weekend-box-tee",
    slug: "weekend-box-tee",
    name: "Weekend Box Tee",
    category: "t-shirt",
    collectionLabel: "WEEKEND LAYER",
    priceCents: 5200,
    shortDescription:
      "A softer oversized tee built for casual layering, with a wide rib collar and slightly dropped shoulder.",
    fit: "Oversized weekend fit",
    material: "Brushed cotton knit",
    imageSrc: "/products/weekend-box-tee-v2.png",
    alt: "A pale blue oversized t-shirt against a light gray studio background.",
  },
  {
    id: "prod-tailored-utility-pant",
    slug: "tailored-utility-pant",
    name: "Tailored Utility Pant",
    category: "pants",
    collectionLabel: "STUDIO TAILORED",
    priceCents: 11800,
    shortDescription:
      "A clean utility trouser with a tapered leg, designed to land between merchandising polish and daily wear.",
    fit: "Tailored straight leg",
    material: "Stretch cotton twill",
    imageSrc: "/products/tailored-utility-pant-v2.png",
    alt: "A pair of slate utility pants photographed in a clean studio setup.",
  },
  {
    id: "prod-commuter-pleated-trouser",
    slug: "commuter-pleated-trouser",
    name: "Commuter Pleated Trouser",
    category: "pants",
    collectionLabel: "CITY TRANSIT",
    priceCents: 12400,
    shortDescription:
      "A refined trouser with soft front pleats and a flexible waistband, built for repeat store-to-office wear.",
    fit: "Relaxed taper",
    material: "Performance suiting blend",
    imageSrc: "/products/relaxed-travel-pant-v2.png",
    alt: "A pair of sand pleated trousers on a pale neutral background.",
  },
  {
    id: "prod-coast-cargo-pant",
    slug: "coast-cargo-pant",
    name: "Coast Cargo Pant",
    category: "pants",
    collectionLabel: "FIELD ACTIVE",
    priceCents: 10800,
    shortDescription:
      "A lighter cargo silhouette with tonal pockets and a clean cuff, tuned for a sport-forward merchandising story.",
    fit: "Easy utility fit",
    material: "Lightweight ripstop",
    imageSrc: "/products/tech-cargo-pant-v2.png",
    alt: "A pair of blue cargo pants presented on a subtle studio background.",
  },
  {
    id: "prod-soft-fleece-crew",
    slug: "soft-fleece-crew",
    name: "Soft Fleece Crew",
    category: "sweatshirt",
    collectionLabel: "LOUNGE STAPLE",
    priceCents: 8800,
    shortDescription:
      "A plush crewneck with an easy shoulder and tonal seam detail for a calm, premium casual shelf set.",
    fit: "Relaxed crew fit",
    material: "Loopback fleece",
    imageSrc: "/products/studio-crewneck.png",
    alt: "A cream fleece crewneck sweatshirt on a soft gray background.",
  },
  {
    id: "prod-ridge-quarter-zip",
    slug: "ridge-quarter-zip",
    name: "Ridge Quarter Zip",
    category: "sweatshirt",
    collectionLabel: "LATE SEASON",
    priceCents: 9600,
    shortDescription:
      "A versatile midweight layer with a structured collar and neat contrast zipper, built for transitional weather.",
    fit: "Structured athletic fit",
    material: "Double-knit jersey",
    imageSrc: "/products/fleece-half-zip.png",
    alt: "A dark quarter-zip sweatshirt photographed as a product still life.",
  },
  {
    id: "prod-loft-hoodie",
    slug: "loft-hoodie",
    name: "Loft Hoodie",
    category: "sweatshirt",
    collectionLabel: "SOFT VOLUME",
    priceCents: 10200,
    shortDescription:
      "A premium hoodie with a roomy body and dense rib trim, designed to anchor the softer side of the assortment.",
    fit: "Roomy volume fit",
    material: "Heavy brushed fleece",
    imageSrc: "/products/zip-hoodie-v2.png",
    alt: "A muted gray hoodie centered on a clean, bright backdrop.",
  },
];

export const categoryLinks: Array<{ value: Category; label: string }> = [
  { value: "all", label: "All products" },
  { value: "t-shirt", label: "T-shirts" },
  { value: "pants", label: "Pants" },
  { value: "sweatshirt", label: "Sweatshirts" },
];

export function getProductsByCategory(category: Category): Product[] {
  if (category === "all") {
    return products;
  }

  return products.filter((product) => product.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
