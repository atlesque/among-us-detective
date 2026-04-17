import { expect, test } from "../fixtures/base";
import {
  activateAllCrew,
  doubleClickCrewMember,
  dragElement,
} from "../helpers/crew";

test.describe("Player suspect and innocent tracking via drag", () => {
  test.beforeEach(async ({ page }) => {
    // Activate all crew so members are in the Unknown column
    await activateAllCrew(page);
  });

  test("Dragging a crew member from Unknown to Innocent column moves them", async ({
    page,
  }) => {
    // We'll drag the first visible crew member from Unknown to Innocent
    const sourceSelector =
      "[data-test='crew-column-unknown'] [data-test^='crew-member-']";
    const targetSelector = "[data-test='crew-column-innocent']";

    const firstMember = page.locator(sourceSelector).first();
    const memberColor = await firstMember.getAttribute("data-test");

    await dragElement(page, sourceSelector, targetSelector);

    // Member should now appear in the Innocent column
    await expect(
      page.locator(
        `[data-test='crew-column-innocent'] [data-test='${memberColor}']`
      )
    ).toBeVisible();
  });

  test("Dragging a crew member from Unknown to Suspect column moves them", async ({
    page,
  }) => {
    const sourceSelector =
      "[data-test='crew-column-unknown'] [data-test^='crew-member-']";
    const targetSelector = "[data-test='crew-column-suspect']";

    const firstMember = page.locator(sourceSelector).first();
    const memberColor = await firstMember.getAttribute("data-test");

    await dragElement(page, sourceSelector, targetSelector);

    await expect(
      page.locator(
        `[data-test='crew-column-suspect'] [data-test='${memberColor}']`
      )
    ).toBeVisible();
  });

  test("Dragging a crew member to the Dead column marks them as dead", async ({
    page,
  }) => {
    const sourceSelector =
      "[data-test='crew-column-unknown'] [data-test^='crew-member-']";
    const targetSelector = "[data-test='crew-column-dead']";

    const firstMember = page.locator(sourceSelector).first();
    const memberColor = await firstMember.getAttribute("data-test");

    await dragElement(page, sourceSelector, targetSelector);

    await expect(
      page.locator(
        `[data-test='crew-column-dead'] [data-test='${memberColor}']`
      )
    ).toBeVisible();
  });

  test("Double-clicking a crew member in the Innocent column removes them", async ({
    page,
  }) => {
    // First drag someone to innocent
    const sourceSelector =
      "[data-test='crew-column-unknown'] [data-test^='crew-member-']";
    const firstMember = page.locator(sourceSelector).first();
    const memberColorAttr = await firstMember.getAttribute("data-test");
    const color = memberColorAttr?.replace("crew-member-", "") ?? "";

    await dragElement(
      page,
      sourceSelector,
      "[data-test='crew-column-innocent']"
    );

    // Verify the member is in the Innocent column
    await expect(
      page.locator(
        `[data-test='crew-column-innocent'] [data-test='crew-member-${color}']`
      )
    ).toBeVisible();

    // Double-click to remove
    await doubleClickCrewMember(
      page,
      color,
      "[data-test='crew-column-innocent']"
    );

    // Member should no longer be in the Innocent column
    await expect(
      page.locator(
        `[data-test='crew-column-innocent'] [data-test='crew-member-${color}']`
      )
    ).not.toBeVisible();
  });

  test("Double-clicking a crew member in the Suspect column removes them", async ({
    page,
  }) => {
    const sourceSelector =
      "[data-test='crew-column-unknown'] [data-test^='crew-member-']";
    const firstMember = page.locator(sourceSelector).first();
    const memberColorAttr = await firstMember.getAttribute("data-test");
    const color = memberColorAttr?.replace("crew-member-", "") ?? "";

    await dragElement(
      page,
      sourceSelector,
      "[data-test='crew-column-suspect']"
    );

    await expect(
      page.locator(
        `[data-test='crew-column-suspect'] [data-test='crew-member-${color}']`
      )
    ).toBeVisible();

    await doubleClickCrewMember(
      page,
      color,
      "[data-test='crew-column-suspect']"
    );

    await expect(
      page.locator(
        `[data-test='crew-column-suspect'] [data-test='crew-member-${color}']`
      )
    ).not.toBeVisible();
  });
});
