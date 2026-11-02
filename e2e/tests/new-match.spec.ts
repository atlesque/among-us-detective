import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";
import { closeModal } from "../helpers/modals";

test.describe("New match", () => {
  test("New match from the vote alert resets the timer like the top bar button", async ({ page }) => {
    // Get to a defeat: 4 players alive with 3 impostors in the match
    await activateAllCrew(page);
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("crew") ?? "{}").crewMembers?.some((m: { isActive: boolean }) => m.isActive))).toBe(true);
    // Kill every board player but three (the player's own color stays alive too)
    const unknown = page.locator("[data-test='crew-column-unknown'] [data-test^='crew-member-']");
    const colors = await unknown.evaluateAll((els) => els.map((el) => el.getAttribute("data-test")));
    for (const testId of colors.slice(3)) {
      await page.locator(`[data-test='crew-column-unknown'] [data-test='${testId}']`).click();
      await page.getByRole("button", { name: "Mark as dead" }).click();
    }

    const alert = page.locator("[data-test='critical-vote-alert']");
    await expect(alert).toBeVisible();

    // Run the timer for a bit, then pause it
    await page.click("[data-test='timer-btn']");
    const display = page.locator("[data-test='timer-display']");
    await expect(display).toHaveText("00:25");
    await page.click("[data-test='timer-toggle-btn']");
    await expect(display).not.toHaveText("00:25", { timeout: 5000 });
    await page.click("[data-test='timer-toggle-btn']");
    await closeModal(page);

    await alert.getByRole("button", { name: "New Match" }).click();
    await expect(alert).toBeHidden();

    await page.click("[data-test='timer-btn']");
    await expect(display).toHaveText("00:25");
  });
});
