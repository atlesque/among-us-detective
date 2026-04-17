import { expect, test } from "../fixtures/base";
import { openHelp } from "../helpers/modals";

const TOTAL_STEPS = 17;

test.describe("Help guide", () => {
  test("Help modal opens when Help button is clicked", async ({ page }) => {
    await openHelp(page);
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await expect(page.locator("text=How to use")).toBeVisible();
  });

  test("Step counter starts at 1 / total", async ({ page }) => {
    await openHelp(page);
    await expect(page.locator("[data-test='help-step-counter']")).toHaveText(
      `1/${TOTAL_STEPS}`
    );
  });

  test("Previous button is disabled on the first step", async ({ page }) => {
    await openHelp(page);
    await expect(page.locator("[data-test='help-prev-btn']")).toBeDisabled();
  });

  test("Next button advances to the next step", async ({ page }) => {
    await openHelp(page);
    await page.click("[data-test='help-next-btn']");
    await expect(page.locator("[data-test='help-step-counter']")).toHaveText(
      `2/${TOTAL_STEPS}`
    );
  });

  test("Previous button goes back after advancing", async ({ page }) => {
    await openHelp(page);
    await page.click("[data-test='help-next-btn']");
    await page.click("[data-test='help-prev-btn']");
    await expect(page.locator("[data-test='help-step-counter']")).toHaveText(
      `1/${TOTAL_STEPS}`
    );
  });

  test("Navigating through all steps reaches the Close button on the last step", async ({
    page,
  }) => {
    await openHelp(page);
    for (let i = 1; i < TOTAL_STEPS; i++) {
      await page.click("[data-test='help-next-btn']");
    }
    await expect(page.locator("[data-test='help-step-counter']")).toHaveText(
      `${TOTAL_STEPS}/${TOTAL_STEPS}`
    );
    await expect(page.locator("[data-test='help-close-btn']")).toBeVisible();
    await expect(page.locator("[data-test='help-next-btn']")).not.toBeVisible();
  });

  test("Close button on the last step closes the modal", async ({ page }) => {
    await openHelp(page);
    for (let i = 1; i < TOTAL_STEPS; i++) {
      await page.click("[data-test='help-next-btn']");
    }
    await page.click("[data-test='help-close-btn']");
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });

  test("Help modal can also be closed via the X button", async ({ page }) => {
    await openHelp(page);
    await page.click("[role='dialog'] button[aria-label='Close']");
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });
});
