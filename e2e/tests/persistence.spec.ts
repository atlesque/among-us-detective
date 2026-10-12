import { expect, goHome, test } from "../fixtures/base";
import { openSettings } from "../helpers/modals";

// The base fixture re-seeds storage on every load of its page, so reloads are
// checked in a second tab of the same context, which shares localStorage.
test.describe("Saved preferences across reloads", () => {
  test("Settings does not reopen after a reload", async ({ page }) => {
    await openSettings(page);
    await expect(page.locator("[role='dialog']")).toBeVisible();

    const reloaded = await page.context().newPage();
    await goHome(reloaded);
    await expect(reloaded.locator("[data-test='new-game-btn']")).toBeVisible();
    await expect(reloaded.locator("[role='dialog']")).toHaveCount(0);
  });

  test("Settings open state saved by older builds is ignored", async ({ page }) => {
    const reloaded = await page.context().newPage();
    await reloaded.addInitScript(() => {
      const saved = JSON.parse(localStorage.getItem("settings") ?? "{}");
      localStorage.setItem("settings", JSON.stringify({ ...saved, settingsModalOpenState: true }));
    });
    await goHome(reloaded);
    await expect(reloaded.locator("[data-test='new-game-btn']")).toBeVisible();
    await expect(reloaded.locator("[role='dialog']")).toHaveCount(0);
  });

  test("Timer sound choice is kept after a reload", async ({ page }) => {
    await page.click("[data-test='timer-btn']");
    const checkbox = page.locator("[data-test='timer-sound-checkbox']");
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();

    const reloaded = await page.context().newPage();
    await goHome(reloaded);
    await reloaded.click("[data-test='timer-btn']");
    await expect(reloaded.locator("[data-test='timer-sound-checkbox']")).not.toBeChecked();
  });
});
