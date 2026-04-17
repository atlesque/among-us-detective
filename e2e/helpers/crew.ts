import { Page } from "@playwright/test";

/**
 * Click the "activate all" button to move every crew member from the inactive
 * pool into the Unknown column in one action. This is the fastest way to get
 * active crew without relying on drag-and-drop.
 */
export async function activateAllCrew(page: Page): Promise<void> {
  await page.click("[data-test='activate-all-btn']");
}

/**
 * Drag a crew member icon from one container to another.
 * Uses Playwright's built-in dragTo which fires proper pointer/mouse events
 * compatible with Sortable.js (the library behind vuedraggable).
 *
 * Both `sourceSelector` and `targetSelector` must be CSS selectors.
 */
export async function dragElement(
  page: Page,
  sourceSelector: string,
  targetSelector: string
): Promise<void> {
  const source = page.locator(sourceSelector).first();
  const target = page.locator(targetSelector).first();

  await source.dragTo(target);

  // Allow Vue reactivity + Sortable.js animations to settle
  await page.waitForTimeout(400);
}

/**
 * Double-click a crew member in a pool to remove it from that column.
 */
export async function doubleClickCrewMember(
  page: Page,
  color: string,
  columnSelector: string
): Promise<void> {
  const member = page
    .locator(`${columnSelector} [data-test="crew-member-${color}"]`)
    .first();
  await member.dblclick();
  await page.waitForTimeout(200);
}
