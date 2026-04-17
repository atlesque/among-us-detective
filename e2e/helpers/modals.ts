import { Page } from "@playwright/test";

export async function openSettings(page: Page): Promise<void> {
  await page.click("[data-test='settings-btn']");
  await page.waitForSelector("[role='dialog']", { state: "visible" });
}

export async function openHelp(page: Page): Promise<void> {
  await page.click("[data-test='help-btn']");
  await page.waitForSelector("[data-test='help-next-btn']", {
    state: "attached",
  });
}

export async function openNotes(page: Page): Promise<void> {
  await page.click("[data-test='notes-btn']");
  await page.waitForSelector("[data-test='notes-container']", {
    state: "visible",
  });
}

export async function openTasks(page: Page): Promise<void> {
  // Tasks button exists in both desktop and mobile layouts; click the first visible one
  await page
    .locator("[data-test='tasks-btn']:visible")
    .first()
    .click();
  await page.waitForSelector("[data-test='reset-tasks-btn']", {
    state: "visible",
  });
}

export async function closeModal(page: Page): Promise<void> {
  // Click the X button inside the modal (aria-label="Close")
  await page.click("[role='dialog'] button[aria-label='Close']");
  await page.waitForSelector("[role='dialog']", { state: "hidden" });
}
