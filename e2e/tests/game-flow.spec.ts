import { expect, test } from "../fixtures/base";
import { activateAllCrew, clearAllCrew } from "../helpers/crew";

test.describe("Game flow — starting rounds and games", () => {
  test("New round and New game buttons are disabled when no crew is active", async ({
    page,
  }) => {
    await clearAllCrew(page);
    await expect(page.locator("[data-test='new-round-btn']")).toBeDisabled();
    await expect(page.locator("[data-test='new-game-btn']")).toBeDisabled();
  });

  test("Activate all crew enables New round and New game buttons", async ({
    page,
  }) => {
    await clearAllCrew(page);
    await expect(page.locator("[data-test='new-round-btn']")).toBeDisabled();
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

    // Trusted and suspicious columns should be empty (tracking cleared)
    await expect(
      page
        .locator("[data-test='crew-column-trusted']")
        .locator("[data-test^='crew-member-']")
    ).toHaveCount(0);
    await expect(
      page
        .locator("[data-test='crew-column-suspicious']")
        .locator("[data-test^='crew-member-']")
    ).toHaveCount(0);
  });

  test("New game keeps active crew in Unknown", async ({
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
    ).toBeVisible();
  });

  test("Tasks guide modal opens and displays task references", async ({ page }) => {
    await page
      .locator("[data-test='tasks-btn']:visible")
      .first()
      .click();
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await expect(page.locator("[role='dialog'] table tbody tr").first()).toBeVisible();

    // Close tasks modal and start new game
    await page.click("[role='dialog'] button[aria-label='Close']");
    await activateAllCrew(page);
    await page.click("[data-test='new-game-btn']");

    // Re-open tasks and verify reference guide remains accessible
    await page
      .locator("[data-test='tasks-btn']:visible")
      .first()
      .click();
    await expect(page.locator("[role='dialog'] table tbody tr").first()).toBeVisible();
  });
});
