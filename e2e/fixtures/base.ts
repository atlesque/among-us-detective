import { test as base, Page } from "@playwright/test";

const DEFAULT_VUEX_STATE = JSON.stringify({
  settings: {
    showColorNames: false,
    showImposterCheckbox: true,
    showTasksCheckbox: true,
    showMeetingsCount: true,
    showPlayerNames: false,
    settingsModalOpenState: false,
    resetNotesOnNewGame: true,
    showRoundNotes: true,
    canTrackOwnColor: true,
    isImproveMapContrastEnabled: true,
  },
  darkMode: {
    isDarkMode: false,
    hasDarkModeBeenSetBefore: false,
  },
});

/**
 * Custom test fixture that:
 *  1. Registers an init script to seed localStorage BEFORE the page loads
 *  2. Navigates to "/" and waits for the app to mount
 *
 * By overriding the built-in `page` fixture we guarantee that
 * `addInitScript` is registered on the blank page before any navigation,
 * so vuex-persist restores from our known defaults and the help/cookie
 * modals do not auto-open.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Must be called BEFORE page.goto so it executes during page load
    await page.addInitScript((vuexState: string) => {
      localStorage.clear();
      // Prevent the help modal auto-opening for "new" visitors
      localStorage.setItem("returningPlayer", JSON.stringify(true));
      // Prevent the cookie warning banner
      localStorage.setItem("acceptedCookies", JSON.stringify(true));
      // Seed persisted settings so all tests start from known state
      localStorage.setItem("vuex", vuexState);
    }, DEFAULT_VUEX_STATE);

    await page.goto("/");
    await page.waitForSelector("[data-test='new-game-btn']", {
      state: "attached",
    });
    await use(page);
  },
});

export { expect } from "@playwright/test";

/** Helper: navigate to home and wait for app readiness (for tests that navigate away). */
export async function goHome(page: Page): Promise<void> {
  await page.goto("/");
  await page.waitForSelector("[data-test='new-game-btn']", {
    state: "attached",
  });
}
