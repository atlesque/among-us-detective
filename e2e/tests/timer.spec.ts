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

  test("Chime reuses one audio context unlocked when the timer starts", async ({ page }) => {
    await page.evaluate(() => {
      const w = window as any;
      const Original = w.AudioContext;
      w.__audio = { contexts: 0, chimes: 0 };
      w.AudioContext = class extends Original {
        constructor(...args: any[]) {
          super(...args);
          w.__audio.contexts++;
        }
        createOscillator() {
          w.__audio.chimes++;
          return super.createOscillator();
        }
      };
    });

    const display = page.locator("[data-test='timer-display']");
    // 25s -> clamped to the 1s minimum
    await page.click("[data-test='timer-adjust--15']");
    await page.click("[data-test='timer-adjust--15']");
    await expect(display).toHaveText("00:01");

    for (const run of [1, 2]) {
      await page.click("[data-test='timer-toggle-btn']");
      // The context exists as soon as Start is tapped, before the chime
      expect(await page.evaluate(() => (window as any).__audio.contexts)).toBe(1);
      await expect(display).toHaveText("00:00", { timeout: 5000 });
      await expect.poll(() => page.evaluate(() => (window as any).__audio.chimes)).toBe(run);
    }

    expect(await page.evaluate(() => (window as any).__audio.contexts)).toBe(1);
  });
});
