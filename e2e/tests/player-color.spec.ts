import { expect, test } from "../fixtures/base";

test.describe("Player color selection", () => {
  test("Player selector button is visible on page load", async ({ page }) => {
    await expect(
      page.locator("[data-test='player-selector-btn']").first()
    ).toBeVisible();
  });

  test("Clicking My player button opens the color picker", async ({ page }) => {
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await expect(
      page.locator("[data-test='player-color-red']").first()
    ).toBeVisible();
  });

  test("Selecting a color updates the button color class", async ({ page }) => {
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await page
      .locator("[data-test='player-color-red']")
      .first()
      .click();

    // The button background class should reflect the new color
    const selectorBtn = page
      .locator("[data-test='player-selector-btn']")
      .first();
    await expect(selectorBtn).toHaveClass(/bg-player-red/);
  });

  test("All 18 player colors are available in the picker", async ({ page }) => {
    const colors = [
      "red",
      "blue",
      "green",
      "pink",
      "orange",
      "yellow",
      "black",
      "white",
      "purple",
      "brown",
      "cyan",
      "lime",
      "maroon",
      "rose",
      "banana",
      "gray",
      "tan",
      "coral",
    ];
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    for (const color of colors) {
      await expect(
        page.locator(`[data-test='player-color-${color}']`).first()
      ).toBeVisible();
    }
  });

  test("Imposter mode checkbox is visible in the color picker", async ({
    page,
  }) => {
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await expect(
      page.locator("[data-test='imposter-mode-row']").first()
    ).toBeVisible();
  });
});
