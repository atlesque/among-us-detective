import { expect, test } from "../fixtures/base";
import { closeModal, openSettings } from "../helpers/modals";

test.describe("App settings", () => {
  test("Settings modal opens when Settings button is clicked", async ({
    page,
  }) => {
    await openSettings(page);
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  });

  test("Settings modal closes via the X button", async ({ page }) => {
    await openSettings(page);
    await closeModal(page);
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });

  test("Show players as — toggling switches between Icons and Color names", async ({
    page,
  }) => {
    await openSettings(page);
    const btn = page.locator("[data-test='setting-show-players-as-btn']");
    const initialText = await btn.textContent();
    await btn.click();
    const newText = await btn.textContent();
    expect(newText).not.toBe(initialText);
  });

  test("Interface theme — toggling switches between Light and Dark", async ({
    page,
  }) => {
    await openSettings(page);
    const btn = page.locator("[data-test='setting-theme-btn']");
    const initialText = await btn.textContent();
    await btn.click();
    const newText = await btn.textContent();
    expect(newText).not.toBe(initialText);
  });

  test("Dark mode toggle applies dark-mode class to the page", async ({
    page,
  }) => {
    await openSettings(page);
    await page.click("[data-test='setting-theme-btn']");
    await closeModal(page);
    // The root div in Home.vue adds class 'dark-mode' when isDarkMode is true
    await expect(page.locator(".dark-mode").first()).toBeVisible();
  });

  test("Show Imposter checkbox — toggling hides/shows the column in crew stats", async ({
    page,
  }) => {
    // Activate crew to see crew stats
    await page.click("[data-test='activate-all-btn']");
    await openSettings(page);
    // Uncheck "Show Imposter checkbox"
    const row = page.locator("[data-test='setting-show-imposter']");
    await row.locator("input[type='checkbox']").uncheck();
    await closeModal(page);
    // The "Imp?" column header should no longer be visible
    await expect(page.locator("th:has-text('Imp?')")).not.toBeVisible();
  });

  test("Show Tasks checkbox — toggling hides/shows the Tasks column in crew stats", async ({
    page,
  }) => {
    await page.click("[data-test='activate-all-btn']");
    await openSettings(page);
    const row = page.locator("[data-test='setting-show-tasks']");
    await row.locator("input[type='checkbox']").uncheck();
    await closeModal(page);
    await expect(page.locator("th:has-text('Tasks?')")).not.toBeVisible();
  });

  test("Show Meetings count — toggling hides/shows the Meeting column in crew stats", async ({
    page,
  }) => {
    await page.click("[data-test='activate-all-btn']");
    await openSettings(page);
    const row = page.locator("[data-test='setting-show-meetings']");
    await row.locator("input[type='checkbox']").uncheck();
    await closeModal(page);
    await expect(page.locator("th:has-text('Meeting?')")).not.toBeVisible();
  });

  test("Show player names — toggling the checkbox enables the Edit names button", async ({
    page,
  }) => {
    await openSettings(page);
    const row = page.locator("[data-test='setting-show-player-names']");
    await row.locator("input[type='checkbox']").check();
    await expect(
      page.locator("[data-test='edit-player-names-btn']")
    ).toBeVisible();
  });

  test("Edit player names — opens player names editing view", async ({
    page,
  }) => {
    await openSettings(page);
    await page
      .locator("[data-test='setting-show-player-names']")
      .locator("input[type='checkbox']")
      .check();
    await page.click("[data-test='edit-player-names-btn']");
    await expect(page.locator("text=Player names")).toBeVisible();
  });

  test("Can track own color — unchecking hides the player from the inactive crew pool", async ({
    page,
  }) => {
    await openSettings(page);
    const row = page.locator("[data-test='setting-track-own-color']");
    await row.locator("input[type='checkbox']").uncheck();
    await closeModal(page);
    // Default player is yellow; it should no longer be in the inactive pool
    await expect(
      page.locator(".pool--inactive [data-test='crew-member-yellow']")
    ).not.toBeVisible();
  });

  test("Reset notes each game checkbox is checked by default", async ({
    page,
  }) => {
    await openSettings(page);
    const row = page.locator("[data-test='setting-reset-notes']");
    await expect(row.locator("input[type='checkbox']")).toBeChecked();
  });

  test("Show round notes checkbox is checked by default", async ({ page }) => {
    await openSettings(page);
    const row = page.locator("[data-test='setting-show-round-notes']");
    await expect(row.locator("input[type='checkbox']")).toBeChecked();
  });

  test("Improve map contrast checkbox is checked by default", async ({
    page,
  }) => {
    await openSettings(page);
    const row = page.locator("[data-test='setting-improve-map-contrast']");
    await expect(row.locator("input[type='checkbox']")).toBeChecked();
  });
});
