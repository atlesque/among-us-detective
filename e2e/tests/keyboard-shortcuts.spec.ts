import { expect, test } from "../fixtures/base";

test.describe("Keyboard shortcuts", () => {
  test("Plain S opens the timer, but Ctrl/Cmd+S does not", async ({ page }) => {
    const timerTitle = page.getByRole("button", { name: /⏳/ });

    await page.keyboard.press("Control+s");
    await page.keyboard.press("Meta+s");
    await page.keyboard.press("Alt+s");
    await expect(timerTitle).toHaveCount(0);

    await page.keyboard.press("s");
    await expect(timerTitle.first()).toBeVisible();
  });

  test("Ctrl/Cmd+I does not toggle Impostor Mode", async ({ page }) => {
    await expect(page.locator("h2", { hasText: "Detective" })).toBeVisible();

    // Checked after each press, since two toggles would cancel each other out
    for (const combo of ["Control+i", "Meta+i"]) {
      await page.keyboard.press(combo);
      await expect(page.locator("h2", { hasText: "Detective" })).toBeVisible();
      await expect(page.locator("h2", { hasText: "Impostor" })).toHaveCount(0);
    }

    await page.keyboard.press("i");
    await expect(page.locator("h2", { hasText: "Impostor" })).toBeVisible();
  });
});
