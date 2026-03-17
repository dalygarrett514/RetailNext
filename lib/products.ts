import type {
  Category,
  DiscoveryTag,
  Product,
  ProductBadge,
  ProductFilter,
  ProductSort,
} from "@/lib/types";

const imageVersion = "20260316";

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
    merchandisingTags: ["new-arrivals", "best-sellers"],
    discoveryTags: ["latest-arrivals", "trending-now"],
    productBadges: ["just-added", "updated-this-week", "low-stock"],
    imageSrc: `/products/essential-tee-v2.png?v=${imageVersion}`,
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
    merchandisingTags: ["new-arrivals", "studio-picks"],
    discoveryTags: ["latest-arrivals"],
    productBadges: ["just-added", "updated-this-week"],
    imageSrc: `/products/archive-graphic-tee-v2.png?v=${imageVersion}`,
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
    merchandisingTags: ["best-sellers"],
    discoveryTags: ["recently-restocked"],
    productBadges: ["back-in-stock", "low-stock"],
    imageSrc: `/products/weekend-box-tee-v2.png?v=${imageVersion}`,
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
    merchandisingTags: ["best-sellers", "studio-picks"],
    discoveryTags: ["trending-now"],
    productBadges: ["updated-this-week"],
    imageSrc: `/products/tailored-utility-pant-v2.png?v=${imageVersion}`,
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
    merchandisingTags: ["new-arrivals"],
    discoveryTags: ["latest-arrivals", "recently-restocked"],
    productBadges: ["just-added", "back-in-stock"],
    imageSrc: `/products/relaxed-travel-pant-v2.png?v=${imageVersion}`,
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
    merchandisingTags: ["best-sellers"],
    discoveryTags: ["recently-restocked", "trending-now"],
    productBadges: ["updated-this-week", "back-in-stock"],
    imageSrc: `/products/tech-cargo-pant-v2.png?v=${imageVersion}`,
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
    merchandisingTags: ["best-sellers", "studio-picks"],
    discoveryTags: ["recently-restocked", "trending-now"],
    productBadges: ["back-in-stock", "low-stock"],
    imageSrc: `/products/studio-crewneck.png?v=${imageVersion}`,
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
    merchandisingTags: ["new-arrivals"],
    discoveryTags: ["latest-arrivals"],
    productBadges: ["just-added", "updated-this-week"],
    imageSrc: `/products/fleece-half-zip.png?v=${imageVersion}`,
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
    merchandisingTags: ["studio-picks"],
    discoveryTags: ["trending-now"],
    productBadges: ["updated-this-week", "low-stock"],
    imageSrc: `/products/zip-hoodie-v2.png?v=${imageVersion}`,
    alt: "A muted gray hoodie centered on a clean, bright backdrop.",
  },
];

export const categoryLinks: Array<{ value: Category; label: string }> = [
  { value: "all", label: "All products" },
  { value: "t-shirt", label: "T-shirts" },
  { value: "pants", label: "Pants" },
  { value: "sweatshirt", label: "Sweatshirts" },
];

export const merchandisingFilterOptions: Array<{
  label: string;
  value: ProductFilter;
}> = [
  { label: "All Products", value: "all" },
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Best Sellers", value: "best-sellers" },
  { label: "Studio Picks", value: "studio-picks" },
];

export const productSortOptions: Array<{ label: string; value: ProductSort }> = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low-to-high" },
  { label: "Price: High to Low", value: "price-high-to-low" },
  { label: "Newest", value: "newest" },
];

export const productBadgeLabels: Record<ProductBadge, string> = {
  "just-added": "Just Added",
  "updated-this-week": "Updated This Week",
  "low-stock": "Low Stock",
  "back-in-stock": "Back in Stock",
};

export function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function levenshteinDistance(left: string, right: string) {
  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }

  for (let col = 0; col < cols; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[left.length][right.length];
}

function isSubsequence(query: string, target: string) {
  let queryIndex = 0;

  for (const character of target) {
    if (character === query[queryIndex]) {
      queryIndex += 1;
    }
  }

  return queryIndex === query.length;
}

export function scoreProduct(query: string, product: Product) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return Number.NEGATIVE_INFINITY;
  }

  const primaryHaystacks = [
    normalizeSearchValue(product.name),
    normalizeSearchValue(product.collectionLabel),
    normalizeSearchValue(product.category),
    ...product.merchandisingTags.map((tag) =>
      normalizeSearchValue(
        merchandisingFilterOptions.find((option) => option.value === tag)?.label ?? tag,
      ),
    ),
    ...product.productBadges.map((badge) => normalizeSearchValue(productBadgeLabels[badge])),
  ];
  const supportiveHaystacks = [
    normalizeSearchValue(product.shortDescription),
    normalizeSearchValue(product.fit),
    normalizeSearchValue(product.material),
  ];

  let bestScore = Number.NEGATIVE_INFINITY;

  for (const haystack of primaryHaystacks) {
    if (haystack.includes(normalizedQuery)) {
      bestScore = Math.max(bestScore, 120 - haystack.indexOf(normalizedQuery));
      continue;
    }

    const haystackWords = haystack.split(" ");
    const queryWords = normalizedQuery.split(" ");

    for (const queryWord of queryWords) {
      for (const haystackWord of haystackWords) {
        if (haystackWord.startsWith(queryWord)) {
          bestScore = Math.max(bestScore, 90 - Math.abs(haystackWord.length - queryWord.length));
        } else if (queryWord.length >= 4) {
          const distance = levenshteinDistance(queryWord, haystackWord);

          if (distance <= 2) {
            bestScore = Math.max(bestScore, 70 - distance * 10);
          }
        }
      }
    }

    if (
      normalizedQuery.replaceAll(" ", "").length >= 4 &&
      isSubsequence(normalizedQuery.replaceAll(" ", ""), haystack.replaceAll(" ", ""))
    ) {
      bestScore = Math.max(bestScore, 45);
    }
  }

  for (const haystack of supportiveHaystacks) {
    if (haystack.includes(normalizedQuery)) {
      bestScore = Math.max(bestScore, 55 - haystack.indexOf(normalizedQuery));
      continue;
    }

    const haystackWords = haystack.split(" ");
    const queryWords = normalizedQuery.split(" ");

    for (const queryWord of queryWords) {
      for (const haystackWord of haystackWords) {
        if (haystackWord.startsWith(queryWord)) {
          bestScore = Math.max(bestScore, 35 - Math.abs(haystackWord.length - queryWord.length));
        }
      }
    }
  }

  return bestScore;
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return [];
  }

  return products
    .map((product) => ({
      product,
      score: scoreProduct(normalizedQuery, product),
    }))
    .filter((entry) => entry.score > Number.NEGATIVE_INFINITY)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.product);
}

export function sortProducts(productsToSort: Product[], sort: ProductSort) {
  const nextProducts = [...productsToSort];

  switch (sort) {
    case "price-low-to-high":
      return nextProducts.sort((left, right) => left.priceCents - right.priceCents);
    case "price-high-to-low":
      return nextProducts.sort((left, right) => right.priceCents - left.priceCents);
    case "newest":
      return nextProducts.reverse();
    case "featured":
    default:
      return nextProducts;
  }
}

export function getSearchRecoverySuggestions(query: string): string[] {
  const normalizedQuery = normalizeSearchValue(query);
  const suggestedTerms = new Set<string>();

  for (const product of products) {
    for (const candidate of [
      product.name,
      product.collectionLabel,
      categoryLinks.find((category) => category.value === product.category)?.label ?? product.category,
    ]) {
      const normalizedCandidate = normalizeSearchValue(candidate);

      if (
        normalizedQuery &&
        (normalizedCandidate.includes(normalizedQuery) ||
          normalizedQuery.includes(normalizedCandidate) ||
          normalizedCandidate
            .split(" ")
            .some((word) => word.startsWith(normalizedQuery.slice(0, Math.min(4, normalizedQuery.length)))))
      ) {
        suggestedTerms.add(candidate);
      }
    }
  }

  if (suggestedTerms.size === 0) {
    suggestedTerms.add("Best sellers");
    suggestedTerms.add("T-shirts");
    suggestedTerms.add("CORE UNIFORM");
  }

  return Array.from(suggestedTerms).slice(0, 3);
}

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

export function getProductsByDiscoveryTag(tag: DiscoveryTag): Product[] {
  return products.filter((product) => product.discoveryTags.includes(tag));
}

const complementaryCategories: Record<Exclude<Category, "all">, Exclude<Category, "all">[]> = {
  "t-shirt": ["pants", "sweatshirt"],
  pants: ["t-shirt", "sweatshirt"],
  sweatshirt: ["t-shirt", "pants"],
};

export function getRecommendedProductsForCategory(category: Exclude<Category, "all">): Product[] {
  return complementaryCategories[category].flatMap((relatedCategory) =>
    products.filter((product) => product.category === relatedCategory),
  );
}

export function getCompleteTheLookProducts(product: Product): Product[] {
  const preferredCategories = complementaryCategories[product.category];

  return [
    ...preferredCategories.flatMap((category) =>
      products.filter((candidate) => candidate.category === category),
    ),
    ...products.filter(
      (candidate) =>
        candidate.category === product.category && candidate.id !== product.id,
    ),
  ].filter((candidate, index, allCandidates) => {
    return (
      candidate.id !== product.id &&
      allCandidates.findIndex((match) => match.id === candidate.id) === index
    );
  });
}
