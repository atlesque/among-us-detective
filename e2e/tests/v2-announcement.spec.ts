import { Page } from "@playwright/test";
import { expect, goHome, test } from "../fixtures/base";

/** Reloads the app as a visitor with the given localStorage flags. */
async function visitAs(
  page: Page,
  flags: { returningPlayer: boolean; seenV2Announcement: boolean }
): Promise<void> {
  // Runs after the fixture's init script, so these values win
  await page.addInitScript((f) => {
    localStorage.setItem("returningPlayer", JSON.stringify(f.returningPlayer));
    localStorage.setItem(
      "seenV2Announcement",
      JSON.stringify(f.seenV2Announcement)
    );
  }, flags);
  await goHome(page);
}

const announcement = "[data-test='v2-announcement-text']";

test.describe("V2 announcement", () => {
  test("Existing players see it right away", async ({ page }) => {
    await visitAs(page, { returningPlayer: true, seenV2Announcement: false });
    await expect(page.locator(announcement)).toBeVisible();
    await expect(page.locator("[data-test='help-next-btn']")).toHaveCount(0);
  });

  test("New players see it only after closing the help modal", async ({
    page,
  }) => {
    await visitAs(page, { returningPlayer: false, seenV2Announcement: false });
    await expect(page.locator("[data-test='help-next-btn']")).toBeVisible();
    await expect(page.locator(announcement)).toHaveCount(0);

    await page.click("[role='dialog'] button[aria-label='Close']");
    await expect(page.locator(announcement)).toBeVisible();
  });

  test("It is not shown again once dismissed", async ({ page }) => {
    await visitAs(page, { returningPlayer: true, seenV2Announcement: false });
    await page.click("[data-test='v2-announcement-later-btn']");
    await expect(page.locator(announcement)).toHaveCount(0);
    expect(
      await page.evaluate(() => localStorage.getItem("seenV2Announcement"))
    ).toBe("true");
  });

  test("Try V2 links to the V2 site", async ({ page }) => {
    await visitAs(page, { returningPlayer: true, seenV2Announcement: false });
    await expect(
      page.locator("[data-test='v2-announcement-try-btn']")
    ).toHaveAttribute("href", /^https:\/\//);
  });
});
