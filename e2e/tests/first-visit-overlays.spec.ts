import { expect, test } from "@playwright/test";

// A first visit shows one thing at a time: the help guide, then the analytics
// choice, then the install prompt.
test("first visit shows help, then the consent banner, then the install prompt", async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
  });
  await page.goto("/");
  await page.waitForSelector("[data-test='new-game-btn']");

  const help = page.locator("[data-test='help-next-btn']");
  const banner = page.locator("[data-test='cookie-warning']");
  const install = page.locator("[data-test='pwa-install-prompt']");

  // The browser offers installation while the help guide is still open
  await page.evaluate(() => {
    const event = new Event("beforeinstallprompt", { cancelable: true });
    window.dispatchEvent(event);
  });

  await expect(help).toBeVisible();
  await expect(banner).toHaveCount(0);
  await expect(install).toHaveCount(0);

  await page.click("[role='dialog'] button[aria-label='Close']");
  await expect(banner).toBeVisible();
  await expect(install).toHaveCount(0);

  await page.locator("[data-test='cookie-decline-btn']").click();
  await expect(banner).toBeHidden();
  await expect(install).toBeVisible();
});
