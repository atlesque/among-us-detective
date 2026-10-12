import { expect, test, Page } from "@playwright/test";

// Exactly what V1 (master) persists after a player has opened its settings.
const V1_SETTINGS = {
  showColorNames: false,
  showImposterCheckbox: true,
  showTasksCheckbox: false,
  showMeetingsCount: true,
  showPlayerNames: true,
  settingsModalOpenState: true,
  resetNotesOnNewGame: false,
  showRoundNotes: true,
  canTrackOwnColor: true,
  isImproveMapContrastEnabled: false,
};

async function seedOnce(page: Page, entries: Record<string, string>): Promise<void> {
  // Init scripts run on every navigation; seed only the first so reloads see
  // what the app itself left behind.
  await page.addInitScript((seed: Record<string, string>) => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "true");
    localStorage.clear();
    for (const [key, value] of Object.entries(seed)) localStorage.setItem(key, value);
  }, entries);
}

function readSettings(page: Page): Promise<Record<string, unknown>> {
  return page.evaluate(() => JSON.parse(localStorage.getItem("settings") ?? "{}"));
}

test.describe("Settings saved by V1", () => {
  test("keep still-valid choices, reset V1 defaults, and show the V2 help once", async ({ page }) => {
    await seedOnce(page, {
      settings: JSON.stringify(V1_SETTINGS),
      darkMode: JSON.stringify({ isDarkMode: false, hasDarkModeBeenSetBefore: true }),
      returningPlayer: "true",
      acceptedCookies: "true",
      // Keeps the consent banner from #87 out of the way once both land.
      analyticsConsent: "denied",
      seenV2Announcement: "true",
    });
    await page.goto("/");

    // V1 players get V2's help guide even though V1 marked them as returning.
    await expect(page.locator("[data-test='help-next-btn']")).toBeVisible();
    await page.click("[role='dialog'] [data-test='modal-close']");
    await expect(page.locator("[role='dialog']")).toBeHidden();

    // V1's saved showColorNames=false default no longer hides color names.
    await expect(
      page.locator(".player-card > span").filter({ hasText: /^\s*Red\s*$/ }).first()
    ).toBeVisible();
    // The V1 light theme choice is kept.
    await expect(page.locator(".dark-mode")).toHaveCount(0);

    const settings = await readSettings(page);
    expect(settings).toMatchObject({
      showColorNames: true,
      showPlayerNames: true,
      resetNotesOnNewGame: false,
      isImproveMapContrastEnabled: false,
      settingsModalOpenState: false,
    });
    expect(settings).not.toHaveProperty("showImposterCheckbox");
    expect(settings).not.toHaveProperty("showTasksCheckbox");
    expect(settings).not.toHaveProperty("showMeetingsCount");
    expect(await page.evaluate(() => localStorage.getItem("seenV2Announcement"))).toBeNull();

    // The migration runs once: a reload neither reopens help nor resets choices.
    await page.reload();
    await expect(page.locator("[data-test='new-game-btn']")).toBeVisible();
    await expect(page.locator("[data-test='help-next-btn']")).toHaveCount(0);
    expect(await readSettings(page)).toMatchObject({ showPlayerNames: true });
  });

  test("settings saved by V2 are left untouched", async ({ page }) => {
    const v2Settings = {
      highlightColorNames: false,
      highlightNotesColors: true,
      showPlayerNames: false,
      showColorNames: false,
      settingsModalOpenState: false,
      resetNotesOnNewGame: true,
      showRoundNotes: true,
      canTrackOwnColor: true,
      isImproveMapContrastEnabled: true,
      uiLanguage: "en-US",
      hasAutoDetectedLanguage: true,
      matchImpostorsCount: 3,
    };
    await seedOnce(page, {
      settings: JSON.stringify(v2Settings),
      returningPlayer: "true",
      acceptedCookies: "true",
      // Keeps the consent banner from #87 out of the way once both land.
      analyticsConsent: "denied",
    });
    await page.goto("/");
    await expect(page.locator("[data-test='new-game-btn']")).toBeVisible();
    await expect(page.locator("[data-test='help-next-btn']")).toHaveCount(0);
    expect(await readSettings(page)).toMatchObject({ showColorNames: false });
  });
});
