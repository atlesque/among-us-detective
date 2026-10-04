import { expect, test } from "@playwright/test";

test.describe("Browser Zoom Notice Banner", () => {
  test("shows banner at 125% zoom without string duplication or stuck words", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1.25,
      hasTouch: false,
    });
    const page = await context.newPage();

    await page.addInitScript(() => {
      localStorage.clear();
      localStorage.setItem("returningPlayer", JSON.stringify(true));
      localStorage.setItem("acceptedCookies", JSON.stringify(true));
    });

    await page.goto("http://localhost:8071/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-test='new-game-btn']", { state: "attached" });

    const banner = page.locator("[data-test='zoom-warning-banner']");
    await expect(banner).toBeVisible();

    const bannerText = (await banner.textContent()) || "";

    // Verify 125% is detected
    expect(bannerText).toContain("125%");

    // Verify Board Zoom text exists
    expect(bannerText).toContain("Board Zoom");

    // Critical check: Ensure "settingsSettings" or stuck words do NOT exist
    expect(bannerText).not.toContain("settingsSettings");
    expect(bannerText).not.toContain("Settingsfor");
    expect(bannerText).not.toContain("settingsfor");
    expect(bannerText).not.toMatch(/settings\s*settings/i);

    // Verify clicking Settings opens the Settings modal
    const settingsBtn = banner.locator("button", { hasText: "Settings" });
    await settingsBtn.click();
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();

    // Close settings
    await page.click("[role='dialog'] button[aria-label='Close']");
    await expect(page.locator("[role='dialog']")).not.toBeVisible();

    // Dismiss banner
    const dismissBtn = banner.locator("button[title='Dismiss notice']");
    await dismissBtn.click();
    await expect(banner).not.toBeVisible();

    await context.close();
  });
});
