import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";

test.describe("Game flow — starting rounds and games", () => {
  test("New round and New game buttons are disabled when no crew is active", async ({
    page,
  }) => {
    await expect(page.locator("[data-test='new-round-btn']")).toBeDisabled();
    await expect(page.locator("[data-test='new-game-btn']")).toBeDisabled();
  });

  test("Activate all crew enables New round and New game buttons", async ({
    page,
  }) => {
    await activateAllCrew(page);
    await expect(page.locator("[data-test='new-round-btn']")).toBeEnabled();
    await expect(page.locator("[data-test='new-game-btn']")).toBeEnabled();
  });

  test("New round keeps crew active and clears per-round tracking", async ({
    page,
  }) => {
    await activateAllCrew(page);

    // Crew should be in the Unknown column and buttons should be enabled
    const unknownColumn = page.locator("[data-test='crew-column-unknown']");
    await expect(
      unknownColumn.locator("[data-test^='crew-member-']").first()
    ).toBeVisible();

    await page.click("[data-test='new-round-btn']");

    // After new round, crew stays active — unknown column still has members
    await expect(
      unknownColumn.locator("[data-test^='crew-member-']").first()
    ).toBeVisible();

    // Innocent and suspect columns should be empty (tracking cleared)
    await expect(
      page
        .locator("[data-test='crew-column-innocent']")
        .locator("[data-test^='crew-member-']")
    ).toHaveCount(0);
    await expect(
      page
        .locator("[data-test='crew-column-suspect']")
        .locator("[data-test^='crew-member-']")
    ).toHaveCount(0);
  });

  test("New game resets active crew back to inactive pool", async ({
    page,
  }) => {
    await activateAllCrew(page);
    const unknownColumn = page.locator("[data-test='crew-column-unknown']");
    await expect(
      unknownColumn.locator("[data-test^='crew-member-']").first()
    ).toBeVisible();

    await page.click("[data-test='new-game-btn']");

    await expect(
      unknownColumn.locator("[data-test^='crew-member-']").first()
    ).not.toBeVisible();
  });

  test("New game resets task checkboxes", async ({ page }) => {
    // Open tasks and toggle a task on
    await page
      .locator("[data-test='tasks-btn']:visible")
      .first()
      .click();
    await page.waitForSelector("[data-test='reset-tasks-btn']");
    const firstTaskCheckbox = page.locator("#task-checkbox-0").first();
    await firstTaskCheckbox.check();
    await expect(firstTaskCheckbox).toBeChecked();

    // Close tasks modal and start new game
    await page.click("[role='dialog'] button[aria-label='Close']");
    await activateAllCrew(page);
    await page.click("[data-test='new-game-btn']");

    // Re-open tasks and verify checkbox is unchecked
    await page
      .locator("[data-test='tasks-btn']:visible")
      .first()
      .click();
    await page.waitForSelector("[data-test='reset-tasks-btn']");
    await expect(page.locator("#task-checkbox-0").first()).not.toBeChecked();
  });

  test("New round resets task checkboxes", async ({ page }) => {
    await page
      .locator("[data-test='tasks-btn']:visible")
      .first()
      .click();
    await page.waitForSelector("[data-test='reset-tasks-btn']");
    const firstTaskCheckbox = page.locator("#task-checkbox-0").first();
    await firstTaskCheckbox.check();
    await expect(firstTaskCheckbox).toBeChecked();

    await page.click("[role='dialog'] button[aria-label='Close']");
    await activateAllCrew(page);
    await page.click("[data-test='new-round-btn']");

    await page
      .locator("[data-test='tasks-btn']:visible")
      .first()
      .click();
    await page.waitForSelector("[data-test='reset-tasks-btn']");
    await expect(page.locator("#task-checkbox-0").first()).not.toBeChecked();
  });
});
