import { expect, test } from "@playwright/test";

test("shopper can search, adjust cart quantity, and complete checkout", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Open search" }).click();
  await page.getByRole("textbox", { name: "Search products" }).fill("essentil");
  await expect(page.getByTestId("header-search-results")).toBeVisible();
  await expect(page.getByTestId("search-result-essential-tee")).toBeVisible();
  await page.getByTestId("search-result-essential-tee").click();

  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }),
  ).toContainText("Home");
  await expect(page.getByText("Just Added")).toBeVisible();

  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("complementary", { name: "Cart drawer" })).toBeVisible();

  await page
    .getByRole("button", { name: "Increase quantity of Essential Tee" })
    .click();
  await expect(page.getByText("$116.00").first()).toBeVisible();

  await page.getByRole("link", { name: "Checkout" }).click();
  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();

  await page.getByRole("button", { name: /PayPal/i }).click();
  await expect(page.getByLabel("Full name")).toHaveCount(0);
  await expect(page.getByLabel("Card number")).toHaveCount(0);

  await page.getByRole("button", { name: /Credit Card/i }).click();
  await expect(page.getByLabel("Full name")).toBeVisible();
  await expect(page.getByLabel("Card number")).toBeVisible();

  await page.getByRole("button", { name: "Billing address same as shipping" }).click();
  await expect(page.getByLabel("Billing full name")).toBeVisible();

  await page.getByLabel("Card number").fill("4111 1111 1111 1111");
  await page.getByLabel("Name on card").fill("Alex Example");
  await page.getByLabel("Expiration date").fill("12/30");
  await page.getByLabel("Security code").fill("123");
  await page.getByRole("textbox", { name: "Billing full name" }).fill("Alex Example");
  await page.getByRole("textbox", { name: "Billing address" }).fill("123 Sample Street");
  await page.getByRole("textbox", { name: "Billing city" }).fill("Demo City");
  await page.getByRole("textbox", { name: "Billing state" }).fill("CA");
  await page.getByRole("textbox", { name: "Billing ZIP code" }).fill("99999");

  await page.getByRole("button", { name: "Complete purchase" }).click();

  await expect(
    page.getByRole("heading", { name: "Purchase complete." }),
  ).toBeVisible();
  await expect(page.getByRole("main").getByText("Subtotal")).toBeVisible();
});

test("shopper can recover from an empty cart by browsing the full catalog", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Open cart" }).click();
  const cartDrawer = page.getByRole("complementary", { name: "Cart drawer" });
  await expect(cartDrawer).toBeVisible();
  await expect(cartDrawer.getByText("Your cart is empty.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Checkout" })).toBeDisabled();

  await cartDrawer.getByRole("link", { name: "Shop all products" }).click();

  await expect(page).toHaveURL(/\/\?view=catalog$/);
  await expect(page.getByRole("heading", { name: "All products" })).toBeVisible();
  await expect(page.getByTestId("product-grid")).toBeVisible();
  await expect(page.getByTestId("product-card").first()).toBeVisible();
});

test("shopper can recover from a zero-result search", async ({ page }) => {
  await page.goto("/search?q=zzzx");

  await expect(
    page.getByRole("heading", { name: "No matches for “zzzx” yet" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Try “Best sellers”" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Try “Best sellers”" }).click();

  await expect(page).toHaveURL(/\/search\?q=Best%20sellers$/);
  await expect(
    page.getByRole("heading", { name: "Results for “Best sellers”" }),
  ).toBeVisible();
  await expect(page.getByText(/styles matched “Best sellers”/)).toBeVisible();
  await expect(page.getByTestId("product-grid")).toBeVisible();
});

test("shopper can recover when facet selections remove all search results", async ({
  page,
}) => {
  await page.goto("/search?q=tee");

  await expect(
    page.getByRole("heading", { name: "Results for “tee”" }),
  ).toBeVisible();
  await expect(page.getByTestId("product-grid")).toBeVisible();

  await page.getByLabel("Studio Picks").click();
  await page.getByLabel("Back in Stock").click();

  await expect(
    page.getByRole("heading", { name: "The current facets are too narrow" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Clear all facets" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Clear all facets" }).click();

  await expect(page.getByTestId("product-grid")).toBeVisible();
  await expect(page.getByText(/3 styles matched “tee”/)).toBeVisible();
});

test("recently viewed persists across product visits", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  const visitedProducts = [
    { name: "Essential Tee", id: "prod-essential-tee" },
    { name: "Tailored Utility Pant", id: "prod-tailored-utility-pant" },
    { name: "Soft Fleece Crew", id: "prod-soft-fleece-crew" },
  ];

  for (const product of visitedProducts) {
    await page.goto("/?view=catalog");
    await page.getByRole("link", { name: product.name }).click();
    await expect(
      page.getByRole("heading", { name: product.name, exact: true }),
    ).toBeVisible();
    await expect
      .poll(async () => {
        return page.evaluate(() => window.localStorage.getItem("retailnext:recently-viewed"));
      })
      .toContain(product.id);
  }

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Pick up where you left off" }),
  ).toBeVisible();
  const recentlyViewedRail = page.getByLabel("Recently Viewed", { exact: true });
  await expect(recentlyViewedRail).toBeVisible();

  for (const product of visitedProducts) {
    await expect(
      recentlyViewedRail.getByRole("heading", { name: product.name, exact: true }).first(),
    ).toBeVisible();
  }

  await expect(
    page.getByRole("heading", {
      name: "Keep exploring categories that match your browsing",
    }),
  ).toBeVisible();

  await expect
    .poll(async () => {
      return page.evaluate(() => window.localStorage.getItem("retailnext:recently-viewed"));
    })
    .toBe(
      JSON.stringify([
        "prod-soft-fleece-crew",
        "prod-tailored-utility-pant",
        "prod-essential-tee",
      ]),
    );
});
