import { expect, test } from "../fixtures/base";
import { closeModal, openTasks } from "../helpers/modals";

test.describe("Tasks modal", () => {
  test("Tasks modal opens when Tasks button is clicked", async ({ page }) => {
    await openTasks(page);
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
  });

  test("Tasks modal shows a list of tasks for the current map", async ({
    page,
  }) => {
    await openTasks(page);
    // Tasks table should contain tasks
    await expect(page.locator("[role='dialog'] table tbody tr").first()).toBeVisible();
  });

  test("Map selector is visible inside the tasks modal", async ({ page }) => {
    await openTasks(page);
    await expect(
      page.locator("[role='dialog'] [data-test='map-selector']")
    ).toBeVisible();
  });

  test("Switching maps inside tasks modal loads the new map's tasks", async ({
    page,
  }) => {
    await openTasks(page);
    // Verify initial map has tasks
    await expect(page.locator("[role='dialog'] table tbody tr").first()).toBeVisible();

    // Switch to Mira HQ
    await page.locator("[role='dialog']").getByRole("button", { name: "Mira HQ" }).click();
    await expect(page.locator("[role='dialog'] table tbody tr").first()).toBeVisible();
  });

  test("Tasks modal closes via the X button", async ({ page }) => {
    await openTasks(page);
    await closeModal(page);
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });

  test("Player card allows toggling task completion and displays checkmark badge", async ({
    page,
  }) => {
    // Activate all crew
    await page.click("[data-test='activate-all-btn']");
    const card = page.locator("[data-test^='crew-member-']").first();
    await expect(card).toBeVisible();

    // Click card to open context menu
    await card.click();
    const tasksToggleBtn = page.locator("[data-test='card-toggle-tasks-btn']");
    await expect(tasksToggleBtn).toBeVisible();
    await expect(tasksToggleBtn).toContainText("In Progress");

    // Toggle tasks to done
    await tasksToggleBtn.click();
    await expect(tasksToggleBtn).toContainText("Done");

    // Close menu by clicking overlay or close button
    await page.locator("[data-test='card-menu-overlay']").click({ force: true });

    // Check that card now has tasks done badge
    await expect(card.locator("[data-test='tasks-done-badge']")).toBeVisible();
  });
});
