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
  if (!(await page.locator("#game-notes").isVisible())) {
    await page.click("[data-test='notes-btn']");
  }
  await page.waitForSelector("#game-notes", {
    state: "visible",
  });
}

export async function openTasks(page: Page): Promise<void> {
  // Tasks button exists in both desktop and mobile layouts; click the first visible one
  await page
    .locator("[data-test='tasks-btn']:visible")
    .first()
    .click();
  await page.waitForSelector("[role='dialog']", {
    state: "visible",
  });
}

export async function closeModal(page: Page): Promise<void> {
  // Use a stable selector so the accessible label can follow the selected locale.
  await page.click("[role='dialog'] [data-test='modal-close']");
  await page.waitForSelector("[role='dialog']", { state: "hidden" });
}
