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
    // At least one task should be in the list
    await expect(page.locator("#task-checkbox-0")).toBeVisible();
  });

  test("Tasks modal shows a Reset button", async ({ page }) => {
    await openTasks(page);
    await expect(page.locator("[data-test='reset-tasks-btn']")).toBeVisible();
  });

  test("Checking a task marks it as done", async ({ page }) => {
    await openTasks(page);
    const checkbox = page.locator("#task-checkbox-0");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test("Unchecking a task marks it as not done", async ({ page }) => {
    await openTasks(page);
    const checkbox = page.locator("#task-checkbox-0");
    await checkbox.check();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test("Reset button unchecks all tasks", async ({ page }) => {
    await openTasks(page);
    const checkbox = page.locator("#task-checkbox-0");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await page.click("[data-test='reset-tasks-btn']");
    await expect(checkbox).not.toBeChecked();
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
    // Check first task on The Skeld
    const firstCheckbox = page.locator("#task-checkbox-0");
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Switch to Mira HQ
    await page.locator("[role='dialog'] [data-test='map-btn-mira-hq']").click();
    // The first task for Mira HQ should be a fresh (unchecked) checkbox
    await expect(page.locator("#task-checkbox-0")).not.toBeChecked();
  });

  test("Tasks modal closes via the X button", async ({ page }) => {
    await openTasks(page);
    await closeModal(page);
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });
});
