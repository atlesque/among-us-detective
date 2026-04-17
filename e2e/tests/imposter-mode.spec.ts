import { expect, test } from "../fixtures/base";

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
});
