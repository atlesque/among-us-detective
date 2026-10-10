import { expect, test } from "../fixtures/base";

function toSeconds(mmss: string): number {
  const [mins, secs] = mmss.trim().split(":").map(Number);
  return mins * 60 + secs;
}

test.describe("Timer", () => {
  test.beforeEach(async ({ page }) => {
    await page.click("[data-test='timer-btn']");
    await expect(page.locator("[data-test='timer-display']")).toBeVisible();
  });

  test("Adjusting an idle timer changes its starting length", async ({ page }) => {
    const display = page.locator("[data-test='timer-display']");
    await expect(display).toHaveText("00:25");
    await page.click("[data-test='timer-adjust-5']");
    await expect(display).toHaveText("00:30");
    await page.click("[data-test='timer-reset-btn']");
    await expect(display).toHaveText("00:30");
  });

  test("Adjusting a paused timer adds to the time left", async ({ page }) => {
    const display = page.locator("[data-test='timer-display']");
    await page.click("[data-test='timer-toggle-btn']");
    await expect(display).not.toHaveText("00:25", { timeout: 5000 });
    await expect(display).not.toHaveText("00:24", { timeout: 5000 });
    await page.click("[data-test='timer-toggle-btn']");

    const pausedAt = toSeconds(await display.innerText());
    expect(pausedAt).toBeLessThan(24);

    await page.click("[data-test='timer-adjust-5']");
    await expect(display).toHaveText(`00:${String(pausedAt + 5).padStart(2, "0")}`);

    // Reset still returns to the starting length
    await page.click("[data-test='timer-reset-btn']");
    await expect(display).toHaveText("00:25");
  });
});
