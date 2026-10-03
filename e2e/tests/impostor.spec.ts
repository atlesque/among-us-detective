import { expect, test } from "../fixtures/base";

test.describe("Impostor Mode", () => {
  test("Impostor Mode button toggles full-page Impostor vibe", async ({ page }) => {
    const impostorBtn = page.locator("[data-test='impostor-mode-btn']");
    await expect(impostorBtn).toBeVisible();

    // Activate Impostor Mode
    await impostorBtn.click();
    await expect(page.locator("h2", { hasText: "Impostor" })).toBeVisible();

    // Deactivate Impostor Mode
    await impostorBtn.click();
    await expect(page.locator("h2", { hasText: "Detective" })).toBeVisible();
  });

  test("Notepad switches to tactical Impostor notes in Impostor Mode", async ({ page }) => {
    const impostorBtn = page.locator("[data-test='impostor-mode-btn']");
    await impostorBtn.click();

    // Round notes textarea should have impostor tactical placeholder
    const roundNotes = page.locator("#round-notes");
    await expect(roundNotes).toBeVisible();
    const placeholder = await roundNotes.getAttribute("placeholder");
    expect(placeholder).toContain("Electrical");
  });

  test("Player card allows marking fellow impostor and selecting role in Impostor Mode", async ({ page }) => {
    // Activate Impostor Mode
    await page.locator("[data-test='impostor-mode-btn']").click();

    // Click on a player card (e.g. Red) to open options popover
    const playerCard = page.locator("[data-test='crew-member-red']").first();
    await playerCard.click();

    // In Impostor Mode, impostor roles are prominently at the top
    const phantomBtn = page.locator("[data-test='impostor-role-phantom']");
    await expect(phantomBtn).toBeVisible();
    await phantomBtn.click();

    // Close popover
    await page.keyboard.press("Escape");

    // Player card should display the IMP badge
    await expect(playerCard.locator("[data-test='imp-badge']")).toBeVisible();
  });
});
