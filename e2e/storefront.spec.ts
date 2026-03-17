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
