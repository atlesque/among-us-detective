import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures/base";
import { activateAllCrew, clearAllCrew } from "../helpers/crew";

async function readImpostorCount(page: Page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem("settings") ?? "{}").matchImpostorsCount);
}

test.describe("Match impostor count", () => {
  test("a saved count from before the lobby-cap preference is kept after reload", async ({ page }) => {
    // Simulate settings saved by an older version: a chosen count, no stored preference.
    await page.addInitScript(() => {
      const settings = JSON.parse(localStorage.getItem("settings") ?? "{}");
      delete settings.preferredMatchImpostorsCount;
      localStorage.setItem("settings", JSON.stringify({ ...settings, matchImpostorsCount: 2 }));
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-test='new-game-btn']", { state: "attached" });

    await clearAllCrew(page);
    await activateAllCrew(page);
    await expect.poll(() => readImpostorCount(page)).toBe(2);
  });
});
