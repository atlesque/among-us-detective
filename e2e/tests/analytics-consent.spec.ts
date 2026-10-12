import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("returningPlayer", JSON.stringify(true));
    // The old "Got it" flag is not a consent choice, so the banner still asks
    localStorage.setItem("acceptedCookies", "true");
  });
});

test("declining analytics is remembered", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-test='new-game-btn']");
  const banner = page.locator("[data-test='cookie-warning']");
  await expect(banner).toBeVisible();
  await page.locator("[data-test='cookie-decline-btn']").click();
  await expect(banner).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem("analyticsConsent"))).toBe("denied");

  await page.reload();
  await expect(page.locator("[data-test='new-game-btn']")).toBeVisible();
  await expect(banner).toBeHidden();
});

test("the privacy page can change the analytics choice", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("[data-test='new-game-btn']");
  await page.locator("[data-test='cookie-accept-btn']").click();
  expect(await page.evaluate(() => localStorage.getItem("analyticsConsent"))).toBe("granted");

  await page.goto("/privacy");
  const toggle = page.locator("[data-test='privacy-analytics-toggle']");
  await expect(page.locator("[data-test='privacy-analytics-status']")).toHaveText("Analytics is allowed.");
  await toggle.click();
  await expect(page.locator("[data-test='privacy-analytics-status']")).toHaveText("Analytics is turned off.");
  expect(await page.evaluate(() => localStorage.getItem("analyticsConsent"))).toBe("denied");
});
