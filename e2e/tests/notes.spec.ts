import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";
import { openNotes } from "../helpers/modals";

test.describe("Notes", () => {
  test("Detective Notepad is visible on the board", async ({ page }) => {
    await openNotes(page);
    await expect(page.locator("[data-test='notes-container']")).toBeVisible();
  });

  test("Round notes textarea is visible by default", async ({ page }) => {
    await openNotes(page);
    await expect(page.locator("#round-notes")).toBeVisible();
  });

  test("Game notes textarea is visible", async ({ page }) => {
    await openNotes(page);
    await expect(page.locator("#game-notes")).toBeVisible();
  });

  test("Typing in round notes saves the content", async ({ page }) => {
    await openNotes(page);
    await page.fill("#round-notes", "Red sus");
    await expect(page.locator("#round-notes")).toHaveValue("Red sus");
  });

  test("Typing in game notes saves the content", async ({ page }) => {
    await openNotes(page);
    await page.fill("#game-notes", "Orange and cyan always together");
    await expect(page.locator("#game-notes")).toHaveValue(
      "Orange and cyan always together"
    );
  });

  test("Notepad can be minimized and expanded via minimize button", async ({ page }) => {
    await openNotes(page);
    await expect(page.locator("#round-notes")).toBeVisible();
    await page.click("[data-test='notes-minimize-btn']");
    await expect(page.locator("#round-notes")).not.toBeVisible();
    await page.click("[data-test='notes-minimize-btn']");
    await expect(page.locator("#round-notes")).toBeVisible();
  });

  test("Round notes are inherited when New round is started", async ({
    page,
  }) => {
    await openNotes(page);
    await page.fill("#round-notes", "Some round notes");

    await activateAllCrew(page);
    await page.click("[data-test='new-round-btn']");

    await openNotes(page);
    await expect(page.locator("#round-notes")).toHaveValue("Some round notes");
  });

  test("Game notes persist after New round", async ({ page }) => {
    await openNotes(page);
    await page.fill("#game-notes", "Persistent game notes");

    await activateAllCrew(page);
    await page.click("[data-test='new-round-btn']");

    await openNotes(page);
    await expect(page.locator("#game-notes")).toHaveValue(
      "Persistent game notes"
    );
  });

  test("Game notes are cleared when New game is started (with reset setting on)", async ({
    page,
  }) => {
    await openNotes(page);
    await page.fill("#game-notes", "These should be cleared");

    await activateAllCrew(page);
    await page.click("[data-test='new-game-btn']");

    await openNotes(page);
    await expect(page.locator("#game-notes")).toHaveValue("");
  });

  test("Notes can be opened via keyboard shortcut N", async ({ page }) => {
    await page.click("[data-test='notes-minimize-btn']");
    await expect(page.locator("#round-notes")).not.toBeVisible();
    await page.keyboard.press("n");
    await expect(page.locator("#round-notes")).toBeVisible();
  });

  test("Notes can be closed via keyboard shortcut Escape", async ({ page }) => {
    await openNotes(page);
    await expect(page.locator("#round-notes")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#round-notes")).not.toBeVisible();
  });

  test("Hiding round notes via settings hides the round notes section", async ({
    page,
  }) => {
    // Disable round notes via settings
    await page.click("[data-test='settings-btn']");
    await page.waitForSelector("[role='dialog']");
    await page
      .locator("[data-test='setting-show-round-notes']")
      .locator("input[type='checkbox']")
      .uncheck();
    await page.click("[role='dialog'] button[aria-label='Close']");

    await openNotes(page);
    await expect(page.locator("#round-notes")).not.toBeVisible();
  });

  test("Typing color names highlights them and toggle button toggles highlighting", async ({
    page,
  }) => {
    await openNotes(page);
    await page.fill("#round-notes", "red and vermelho were in electrical");
    await page.dispatchEvent("#round-notes", "input");

    // Check that highlight marks are generated
    await expect(page.locator(".hwt-highlights mark.hwt-mark-red").first()).toBeVisible();

    // Toggle off via the header toggle button
    await page.click("[data-test='toggle-notepad-highlight']");
    await expect(page.locator(".hwt-highlights mark.hwt-mark-red")).toHaveCount(0);

    // Toggle back on
    await page.click("[data-test='toggle-notepad-highlight']");
    await expect(page.locator(".hwt-highlights mark.hwt-mark-red").first()).toBeVisible();
  });

  test("Notes color highlighting setting is independent from board color highlighting", async ({
    page,
  }) => {
    await page.click("[data-test='settings-btn']");
    await page.waitForSelector("[role='dialog']");

    const boardCheckbox = page
      .locator("[data-test='setting-highlight-color-names']")
      .locator("input[type='checkbox']");
    const notesCheckbox = page
      .locator("[data-test='setting-notes-highlight-color-names']")
      .locator("input[type='checkbox']");

    await expect(boardCheckbox).not.toBeChecked();
    await expect(notesCheckbox).toBeChecked();

    await notesCheckbox.uncheck();
    await expect(notesCheckbox).not.toBeChecked();
    await expect(boardCheckbox).not.toBeChecked();

    await page.click("[role='dialog'] button[aria-label='Close']");

    await openNotes(page);
    await page.fill("#round-notes", "red lime banana");
    await page.dispatchEvent("#round-notes", "input");
    await expect(page.locator(".hwt-highlights mark")).toHaveCount(0);
  });
});
