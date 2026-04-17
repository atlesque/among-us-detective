import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";
import { closeModal, openNotes } from "../helpers/modals";

test.describe("Notes", () => {
  test("Notes modal opens when Notes button is clicked", async ({ page }) => {
    await openNotes(page);
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Notes" })).toBeVisible();
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

  test("Notes modal can be closed via the X button", async ({ page }) => {
    await openNotes(page);
    await closeModal(page);
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });

  test("Round notes are cleared when New round is started", async ({
    page,
  }) => {
    await openNotes(page);
    await page.fill("#round-notes", "Some round notes");
    await closeModal(page);

    await activateAllCrew(page);
    await page.click("[data-test='new-round-btn']");

    await openNotes(page);
    await expect(page.locator("#round-notes")).toHaveValue("");
  });

  test("Game notes persist after New round", async ({ page }) => {
    await openNotes(page);
    await page.fill("#game-notes", "Persistent game notes");
    await closeModal(page);

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
    await closeModal(page);

    await activateAllCrew(page);
    await page.click("[data-test='new-game-btn']");

    await openNotes(page);
    await expect(page.locator("#game-notes")).toHaveValue("");
  });

  test("Notes can be opened via keyboard shortcut N", async ({ page }) => {
    await page.keyboard.press("n");
    await expect(page.locator("#round-notes")).toBeVisible();
  });

  test("Notes can be closed via keyboard shortcut Escape", async ({ page }) => {
    await openNotes(page);
    await page.keyboard.press("Escape");
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
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
});
