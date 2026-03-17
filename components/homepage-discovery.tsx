import Image from "next/image";
import Link from "next/link";
import { ProductCarousel } from "@/components/product-carousel";
import { RecentlyViewedSection } from "@/components/recently-viewed-section";
import type { Product } from "@/lib/types";

const homepageStories = [
  {
    title: "Train in alpine layers",
    description:
      "Discover lightweight layers and technical essentials built to keep up with every workout.",
    imageSrc:
      "https://images.lululemon.com/is/image/lululemon/NA_FEB26_Wk2_Train_Ecom_Alpine_4UP_Feature_D_Workout?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    href: "/?category=pants",
  },
  {
    title: "Casual pants with real momentum",
    description:
      "Find easy everyday pants with polished structure, relaxed comfort, and wear-anywhere versatility.",
    imageSrc:
      "https://images.lululemon.com/is/image/lululemon/NA_Feb26_Wk4_AG_Pants_EasyFive_3UP_Feature_D_CasualPants-Alt?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    href: "/?category=pants",
  },
  {
    title: "Soft loungewear stories",
    description:
      "Settle into soft fleece, relaxed layers, and off-duty pieces made for all-day comfort.",
    imageSrc:
      "https://images.lululemon.com/is/image/lululemon/NA_Feb26_Wk3_W_OTM_3UP_Feature_D_Loungewear?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    href: "/?category=sweatshirt",
  },
];

const categoryCards = [
  {
    title: "Women’s workout essentials",
    eyebrow: "Popular categories",
    imageSrc:
      "https://images.lululemon.com/is/image/lululemon/NA_Jan26_Wk4_PopularCategories_W_Workout_6UP_Feature_D?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    href: "/?category=t-shirt",
  },
  {
    title: "Run-ready technical tops",
    eyebrow: "Trending now",
    imageSrc:
      "https://images.lululemon.com/is/image/lululemon/NA_SP26_Run_Mar_Wk1_Alpine_App_5_6_Category_Tile_WomensScreen_Swiftly_UPDATE?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    href: "/?category=t-shirt",
  },
  {
    title: "Relaxed pants refreshed",
    eyebrow: "Back in stock",
    imageSrc:
      "https://images.lululemon.com/is/image/lululemon/NA_Feb26_Wk4_W_Pants_EasyFive_3UP_Feature_D_CasualPants-Alt?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    href: "/?category=pants",
  },
];

function DiscoverySection({
  id,
  eyebrow,
  title,
  description,
  products,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
}) {
  return (
    <section id={id} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="meta-kicker">{eyebrow}</p>
          <h2 className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
            {title}
          </h2>
          <p className="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
            {description}
          </p>
        </div>
      </div>
      <ProductCarousel ariaLabel={eyebrow} products={products} />
    </section>
  );
}

export function HomepageDiscovery({
  latestArrivals,
  recentlyRestocked,
  trendingProducts,
}: {
  latestArrivals: Product[];
  recentlyRestocked: Product[];
  trendingProducts: Product[];
}) {
  return (
    <div className="page-shell space-y-16 !pt-0 md:space-y-20">
      <section className="hero-banner hero-banner-full relative min-h-[min(74vh,48rem)] overflow-hidden">
        <Image
          alt="A lifestyle banner showing the latest arrivals styled in motion."
          className="object-cover object-[center_12%]"
          fill
          priority
          sizes="100vw"
          src="https://images.lululemon.com/is/image/lululemon/NA_Mar26_Wk2_W_OTM_Hero_Carousel_D_HP_WhatsNew?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
        />

        <div className="hero-banner-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto flex min-h-[min(74vh,48rem)] w-full max-w-[1600px] flex-col justify-end px-5 py-10 md:px-8 md:py-14 xl:px-16">
          <div className="max-w-[560px] space-y-5">
            <p className="meta-kicker">What’s New</p>
            <h1 className="font-display text-5xl leading-[0.94] tracking-[-0.07em] text-[var(--ink)] md:text-7xl">
              Latest arrivals, trending picks, restocked favorites.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[var(--ink)]/76 md:text-lg">
              Discover what just landed, find your next favorite, and shop the
              styles everyone wants now.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link className="pill-control bg-white text-[var(--ink)]" href="#latest-arrivals">
                Shop latest arrivals
              </Link>
              <Link className="pill-control primary-pill" href="/?view=catalog">
                Shop all products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {homepageStories.map((story) => (
          <Link
            key={story.title}
            className="story-card group relative overflow-hidden rounded-[2rem]"
            href={story.href}
          >
            <div className="relative min-h-[420px]">
              <Image
                alt={story.title}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                src={story.imageSrc}
              />
            </div>
            <div className="story-card-overlay absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">{story.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/84">
                {story.description}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <DiscoverySection
        id="latest-arrivals"
        description="Be first to shop the newest drops, fresh colors, and just-landed styles."
        eyebrow="Latest Arrivals"
        products={latestArrivals}
        title="Just in and ready to wear"
      />

      <section className="surface-panel overflow-hidden p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="meta-kicker">Category Stories</p>
            <h2 className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
              Captivating entry points into the catalog
            </h2>
            <p className="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
              Explore standout collections and find the styles that match how you
              want to move, lounge, and live.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {categoryCards.map((card) => (
            <Link
              key={card.title}
              className="group relative overflow-hidden rounded-[2rem]"
              href={card.href}
            >
              <div className="relative min-h-[380px]">
                <Image
                  alt={card.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  src={card.imageSrc}
                />
              </div>
              <div className="story-card-overlay absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                <p className="meta-kicker text-[var(--surface-solid)]">{card.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DiscoverySection
        description="Your favorites are back. Shop returning styles before they sell through again."
        eyebrow="Recently Restocked"
        products={recentlyRestocked}
        title="Back in stock and back on your radar"
      />

      <DiscoverySection
        description="Shop the pieces everyone is reaching for right now."
        eyebrow="Trending Now"
        products={trendingProducts}
        title="Best-loved styles right now"
      />

      <section id="catalog" className="space-y-6">
        <div className="surface-panel flex flex-col gap-5 p-8 md:flex-row md:items-end md:justify-between md:p-10">
          <div className="max-w-2xl space-y-3">
            <p className="meta-kicker">Full Catalog</p>
            <h2 className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
              Browse the complete assortment
            </h2>
            <p className="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
              Keep exploring the full collection and find the pieces that fit your
              routine, style, and pace.
            </p>
          </div>
          <Link className="pill-control primary-pill w-fit" href="/?view=catalog">
            View all products
          </Link>
        </div>
      </section>

      <RecentlyViewedSection />
    </div>
  );
}
