import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";

test.describe("Imposter mode", () => {
  test("Column headers show default labels (not imposter) on load", async ({
    page,
  }) => {
    await expect(
      page.locator("[data-test='crew-col-header-innocent']")
    ).toHaveText("My innocents");
    await expect(
      page.locator("[data-test='crew-col-header-suspect']")
    ).toHaveText("My suspects");
  });

  test("Marking the player as imposter changes Innocent column header to 'My protectors'", async ({
    page,
  }) => {
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await page
      .locator("[data-test='imposter-mode-row']")
      .first()
      .locator("input[type='checkbox']")
      .check();
    // Close picker
    await page
      .locator("[role='dialog']")
      .first()
      .locator("button[aria-label='Close']")
      .click();

    await expect(
      page.locator("[data-test='crew-col-header-innocent']")
    ).toHaveText("My protectors");
  });

  test("Marking the player as imposter changes Suspect column header to 'Hitlist'", async ({
    page,
  }) => {
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await page
      .locator("[data-test='imposter-mode-row']")
      .first()
      .locator("input[type='checkbox']")
      .check();
    await page
      .locator("[role='dialog']")
      .first()
      .locator("button[aria-label='Close']")
      .click();

    await expect(
      page.locator("[data-test='crew-col-header-suspect']")
    ).toHaveText("Hitlist");
  });

  test("Unmarking imposter reverts headers back to default labels", async ({
    page,
  }) => {
    // Mark as imposter
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await page
      .locator("[data-test='imposter-mode-row']")
      .first()
      .locator("input[type='checkbox']")
      .check();
    await page
      .locator("[role='dialog']")
      .first()
      .locator("button[aria-label='Close']")
      .click();

    // Unmark imposter
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await page
      .locator("[data-test='imposter-mode-row']")
      .first()
      .locator("input[type='checkbox']")
      .uncheck();
    await page
      .locator("[role='dialog']")
      .first()
      .locator("button[aria-label='Close']")
      .click();

    await expect(
      page.locator("[data-test='crew-col-header-innocent']")
    ).toHaveText("My innocents");
    await expect(
      page.locator("[data-test='crew-col-header-suspect']")
    ).toHaveText("My suspects");
  });

  test("In Impostor mode, marking a crew member as Impostor adds them to Protectors, not Hitlist", async ({
    page,
  }) => {
    // Select yellow as the player (sorts last alphabetically — guarantees the
    // first crew stats row is never the player's own row)
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await page
      .locator("[role='dialog']")
      .first()
      .locator("[data-test='player-color-yellow']")
      .click();
    // Enable Impostor mode
    await page
      .locator("[data-test='imposter-mode-row']")
      .first()
      .locator("input[type='checkbox']")
      .check();
    await page
      .locator("[role='dialog']")
      .first()
      .locator("button[aria-label='Close']")
      .click();

    // Activate all crew so the crew stats table is populated
    await activateAllCrew(page);

    // Mark the first non-player crew member (banana — alphabetically first) as
    // an Impostor via the Imp? checkbox in the crew stats table
    await page
      .locator(
        ".crew-stats tbody tr:not(.is-dead) td:nth-child(2) input[type='checkbox']"
      )
      .first()
      .check();

    // The marked member should appear in "My protectors" (innocent column)
    await expect(
      page.locator(
        "[data-test='crew-column-innocent'] [data-test='crew-member-banana']"
      )
    ).toBeVisible();

    // The marked member should NOT appear in the Hitlist (suspect column)
    await expect(
      page.locator(
        "[data-test='crew-column-suspect'] [data-test='crew-member-banana']"
      )
    ).not.toBeVisible();
  });

  test("In Impostor mode, unchecking a fellow Impostor sends them to Unknown, not Hitlist", async ({
    page,
  }) => {
    // Select yellow as the player
    await page
      .locator("[data-test='player-selector-btn']")
      .first()
      .click();
    await page
      .locator("[role='dialog']")
      .first()
      .locator("[data-test='player-color-yellow']")
      .click();
    // Enable Impostor mode
    await page
      .locator("[data-test='imposter-mode-row']")
      .first()
      .locator("input[type='checkbox']")
      .check();
    await page
      .locator("[role='dialog']")
      .first()
      .locator("button[aria-label='Close']")
      .click();

    await activateAllCrew(page);

    const firstImpCheckbox = page
      .locator(
        ".crew-stats tbody tr:not(.is-dead) td:nth-child(2) input[type='checkbox']"
      )
      .first();

    // Mark banana as fellow Impostor (goes to Protectors)
    await firstImpCheckbox.check();
    // Unmark banana as Impostor (should return to Unknown, not Hitlist)
    await firstImpCheckbox.uncheck();

    // Should be in the Unknown column
    await expect(
      page.locator(
        "[data-test='crew-column-unknown'] [data-test='crew-member-banana']"
      )
    ).toBeVisible();

    // Should NOT be in the Hitlist (suspect column)
    await expect(
      page.locator(
        "[data-test='crew-column-suspect'] [data-test='crew-member-banana']"
      )
    ).not.toBeVisible();
  });
});
