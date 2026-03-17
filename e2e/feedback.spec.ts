import { expect, test } from "@playwright/test";

test("shopper can submit footer feedback", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("heading", { name: "Tell us how shopping felt today" }).scrollIntoViewIfNeeded();
  await page
    .getByRole("textbox", { name: "Feedback" })
    .fill("Search felt fast, but I would like even more filter options.");
  await page.getByRole("button", { name: "Send feedback" }).click();

  await expect(
    page.getByText("Thanks. Your feedback has been captured for this demo."),
  ).toBeVisible();
});
