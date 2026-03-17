export type Category = "all" | "t-shirt" | "pants" | "sweatshirt";
export type ProductFilter =
  | "all"
  | "new-arrivals"
  | "best-sellers"
  | "studio-picks";
export type DiscoveryTag =
  | "latest-arrivals"
  | "recently-restocked"
  | "trending-now";
export type ProductBadge =
  | "just-added"
  | "updated-this-week"
  | "low-stock"
  | "back-in-stock";
export type ProductSort =
  | "featured"
  | "price-low-to-high"
  | "price-high-to-low"
  | "newest";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Exclude<Category, "all">;
  collectionLabel: string;
  priceCents: number;
  shortDescription: string;
  fit: string;
  material: string;
  merchandisingTags: ProductFilter[];
  discoveryTags: DiscoveryTag[];
  productBadges: ProductBadge[];
  imageSrc: string;
  alt: string;
}

export interface CartLine {
  lineId: string;
  productId: Product["id"];
  addedAt: string;
  quantity: number;
}

export interface CheckoutForm {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderItem {
  lineId: string;
  productId: Product["id"];
  name: string;
  collectionLabel: string;
  priceCents: number;
  quantity: number;
  imageSrc: string;
}

export interface OrderSnapshot {
  orderId: string;
  items: OrderItem[];
  shipping: CheckoutForm;
  subtotalCents: number;
  createdAt: string;
}
