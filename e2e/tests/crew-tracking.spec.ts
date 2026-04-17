import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";

test.describe("Crew tracking", () => {
  test.beforeEach(async ({ page }) => {
    await activateAllCrew(page);
  });

  test("Activating all crew populates the Unknown column", async ({ page }) => {
    const unknownColumn = page.locator("[data-test='crew-column-unknown']");
    await expect(
      unknownColumn.locator("[data-test^='crew-member-']").first()
    ).toBeVisible();
  });

  test("Crew stats table is visible once crew is active", async ({ page }) => {
    await expect(page.locator(".crew-stats")).toBeVisible();
  });

  test("Imposter checkbox is visible in crew stats (default setting)", async ({
    page,
  }) => {
    await expect(page.locator("th:has-text('Imp?')")).toBeVisible();
  });

  test("Tasks checkbox is visible in crew stats (default setting)", async ({
    page,
  }) => {
    await expect(page.locator("th:has-text('Tasks?')")).toBeVisible();
  });

  test("Meetings counter is visible in crew stats (default setting)", async ({
    page,
  }) => {
    await expect(page.locator("th:has-text('Meeting?')")).toBeVisible();
  });

  test("Marking a crew member as imposter checks the Imp checkbox", async ({
    page,
  }) => {
    // Find first crew member row in crew stats and tick its Imp checkbox
    const firstImpCheckbox = page
      .locator(
        ".crew-stats tbody tr:not(.is-dead) td:nth-child(2) input[type='checkbox']"
      )
      .first();
    await firstImpCheckbox.check();
    await expect(firstImpCheckbox).toBeChecked();
  });

  test("Unchecking imposter removes the flag", async ({ page }) => {
    const firstImpCheckbox = page
      .locator(
        ".crew-stats tbody tr:not(.is-dead) td:nth-child(2) input[type='checkbox']"
      )
      .first();
    await firstImpCheckbox.check();
    await firstImpCheckbox.uncheck();
    await expect(firstImpCheckbox).not.toBeChecked();
  });

  test("Marking a crew member's tasks as done checks the Tasks checkbox", async ({
    page,
  }) => {
    const firstTaskCheckbox = page
      .locator(
        ".crew-stats tbody tr:not(.is-dead) td:nth-child(3) input[type='checkbox']"
      )
      .first();
    await firstTaskCheckbox.check();
    await expect(firstTaskCheckbox).toBeChecked();
  });

  test("Meeting counter increments when + is clicked", async ({ page }) => {
    const counterDisplay = page
      .locator(".crew-stats tbody tr:not(.is-dead) span.text-2xl")
      .first();
    const initialCount = await counterDisplay.textContent();

    const incrementBtn = page
      .locator(".crew-stats tbody tr:not(.is-dead) button:has-text('+')")
      .first();
    await incrementBtn.click();

    const newCount = await counterDisplay.textContent();
    expect(Number(newCount)).toBe(Number(initialCount) + 1);
  });

  test("Meeting counter decrements when - is clicked", async ({ page }) => {
    const incrementBtn = page
      .locator(".crew-stats tbody tr:not(.is-dead) button:has-text('+')")
      .first();
    await incrementBtn.click();

    const counterDisplay = page
      .locator(".crew-stats tbody tr:not(.is-dead) span.text-2xl")
      .first();
    const countAfterIncrement = await counterDisplay.textContent();

    const decrementBtn = page
      .locator(".crew-stats tbody tr:not(.is-dead) button:has-text('-')")
      .first();
    await decrementBtn.click();

    const newCount = await counterDisplay.textContent();
    expect(Number(newCount)).toBe(Number(countAfterIncrement) - 1);
  });
});
