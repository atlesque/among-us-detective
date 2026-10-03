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

});
