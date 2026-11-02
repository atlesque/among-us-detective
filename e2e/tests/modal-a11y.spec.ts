import { expect, test } from "../fixtures/base";
import { openHelp, openNotes, openSettings, openTasks } from "../helpers/modals";

test.describe("Modal accessibility", () => {
  test("Escape closes the modal without minimising the notepad", async ({ page }) => {
    await openNotes(page);
    await openSettings(page);

    await page.keyboard.press("Escape");
    await expect(page.locator("[role='dialog']")).toHaveCount(0);
    await expect(page.locator("#round-notes")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#round-notes")).not.toBeVisible();
  });

  test("Focus moves into the modal, stays there and returns on close", async ({ page }) => {
    const settingsBtn = page.locator("[data-test='settings-btn']");
    await settingsBtn.focus();
    await page.keyboard.press("Enter");
    const dialog = page.locator("[role='dialog']");
    await expect(dialog).toBeVisible();

    const isFocusInsideDialog = () =>
      page.evaluate(() => !!document.activeElement?.closest("[role='dialog']"));

    await expect.poll(isFocusInsideDialog).toBe(true);
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      expect(await isFocusInsideDialog()).toBe(true);
    }
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Shift+Tab");
      expect(await isFocusInsideDialog()).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(settingsBtn).toBeFocused();
  });

  test("Each modal title has its own id", async ({ page }) => {
    const labelledBy = async () => {
      const id = await page.locator("[role='dialog']").getAttribute("aria-labelledby");
      expect(id).toBeTruthy();
      await expect(page.locator(`[id='${id}']`)).toHaveCount(1);
      return id;
    };

    await openSettings(page);
    const settingsId = await labelledBy();
    await page.keyboard.press("Escape");

    await openHelp(page);
    const helpId = await labelledBy();
    await page.keyboard.press("Escape");

    expect(helpId).not.toBe(settingsId);
  });

  test("Clear-search button in the Tasks modal has a label", async ({ page }) => {
    await openTasks(page);
    await page.locator("[role='dialog'] input").first().fill("wires");
    await expect(page.getByRole("button", { name: "Clear search" })).toBeVisible();
  });
});
