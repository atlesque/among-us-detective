import { expect, test } from "../fixtures/base";
import { activateAllCrew, dragElement } from "../helpers/crew";

async function getPersistedRoleState(page: import("@playwright/test").Page, color: string) {
  return page.evaluate((memberColor) => {
    const crew = JSON.parse(localStorage.getItem("crew") ?? "{}");
    const impostor = JSON.parse(localStorage.getItem("impostor") ?? "{}");
    return {
      member: crew.crewMembers?.find((member: { color: string }) => member.color === memberColor),
      fellowImpostors: impostor.fellowImpostors ?? [],
      fellowImpostorRoles: impostor.fellowImpostorRoles ?? {},
    };
  }, color);
}

test.describe("Role confirmation", () => {
  test.beforeEach(async ({ page }) => {
    await activateAllCrew(page);
  });

  test("assigning a crew role stays as a claim until confirmed", async ({ page }) => {
    const member = page.locator("[data-test='crew-member-red']");

    await member.click();
    await page.getByRole("button", { name: "Detective" }).click();

    await expect(page.locator("[data-test='crew-column-trusted'] [data-test='crew-member-red']")).not.toBeVisible();
    await expect(page.locator("[data-test='crew-column-unknown'] [data-test='crew-member-red']")).toBeVisible();

    await member.click();
    await page.getByRole("button", { name: "Confirm role" }).click();

    await expect(page.locator("[data-test='crew-column-hard-clear'] [data-test='crew-member-red']")).toBeVisible();
  });

  test("the Tracker crew role can be assigned and confirmed", async ({ page }) => {
    const member = page.locator("[data-test='crew-member-red']");

    await member.click();
    await page.getByRole("button", { name: "Tracker" }).click();

    const state = await getPersistedRoleState(page, "red");
    expect(state.member).toMatchObject({ role: "Tracker", roleConfirmed: false });

    await member.click();
    await page.getByRole("button", { name: "Confirm role" }).click();

    await expect(page.locator("[data-test='crew-column-hard-clear'] [data-test='crew-member-red']")).toBeVisible();
  });

  test("moving an impostor role to Impostor confirms it, while a crew role is cleared", async ({ page }) => {
    const impostorMember = page.locator("[data-test='crew-member-red']");
    await impostorMember.click();
    await page.getByRole("button", { name: "Shapeshifter" }).click();
    await dragElement(page, "[data-test='crew-member-red']", "[data-test='crew-column-impostor']");

    await expect(page.locator("[data-test='crew-column-impostor'] [data-test='crew-member-red']")).toBeVisible();
    await expect(page.locator("[data-test='crew-member-red']")).toHaveAttribute("title", /Verified/);

    const crewMember = page.locator("[data-test='crew-member-blue']");
    await crewMember.click();
    await page.getByRole("button", { name: "Detective" }).click();
    await dragElement(page, "[data-test='crew-member-blue']", "[data-test='crew-column-impostor']");

    await expect(page.locator("[data-test='crew-column-impostor'] [data-test='crew-member-blue']")).toBeVisible();
    await expect(page.locator("[data-test='crew-member-blue']")).toHaveAttribute("title", /\(.*Claimed/);
  });

  test("moving a confirmed impostor role to Hard Clear clears the final identity and partner state", async ({ page }) => {
    await page.locator("[data-test='impostor-mode-btn']").click();
    const member = page.locator("[data-test='crew-member-red']");
    await member.click();
    await page.locator("[data-test='impostor-role-phantom']").click();
    await expect(member.locator("text=Phantom")).toBeVisible();

    await dragElement(page, "[data-test='crew-member-red']", "[data-test='crew-column-hard-clear']");

    const state = await getPersistedRoleState(page, "red");
    expect(state.member).toMatchObject({
      role: null,
      roleConfirmed: false,
      status: "hard_clear",
      isDead: false,
      isImposter: false,
    });
    expect(state.fellowImpostors).not.toContain("red");
    expect(state.fellowImpostorRoles).not.toHaveProperty("red");
    await expect(page.locator("[data-test='crew-column-hard-clear'] [data-test='crew-member-red']")).not.toHaveClass(/ring-rose-500/);
  });

  test("assigning a crew role clears a stale fellow impostor badge and role", async ({ page }) => {
    await page.locator("[data-test='impostor-mode-btn']").click();
    const member = page.locator("[data-test='crew-member-red']");
    await member.click();
    await page.locator("[data-test='impostor-role-phantom']").click();

    await member.click();
    await page.getByRole("button", { name: "Scientist" }).click();

    const state = await getPersistedRoleState(page, "red");
    expect(state.member).toMatchObject({ role: "Scientist", roleConfirmed: false, isImposter: true });
    expect(state.fellowImpostors).not.toContain("red");
    expect(state.fellowImpostorRoles).not.toHaveProperty("red");
    await expect(member).not.toHaveClass(/ring-rose-500/);
  });

  test("clearing an impostor role removes its partner badge but preserves the board deduction", async ({ page }) => {
    await page.locator("[data-test='impostor-mode-btn']").click();
    const member = page.locator("[data-test='crew-member-red']");
    await member.click();
    await page.locator("[data-test='impostor-role-phantom']").click();

    await member.click();
    await page.getByRole("button", { name: "Clear role" }).click();

    const state = await getPersistedRoleState(page, "red");
    expect(state.member).toMatchObject({ role: null, roleConfirmed: false, status: "impostor", isImposter: true });
    expect(state.fellowImpostors).not.toContain("red");
    expect(state.fellowImpostorRoles).not.toHaveProperty("red");
    await expect(member).not.toHaveClass(/ring-rose-500/);
  });

  test("death and revival keep the identity flag aligned with status and confirmation", async ({ page }) => {
    await page.locator("[data-test='impostor-mode-btn']").click();
    const member = page.locator("[data-test='crew-member-red']");
    await member.click();
    await page.locator("[data-test='impostor-role-phantom']").click();

    await member.click();
    await page.getByRole("button", { name: "Mark as dead" }).click();
    let state = await getPersistedRoleState(page, "red");
    expect(state.member).toMatchObject({ status: "dead", isDead: true, isImposter: true, role: "Phantom", roleConfirmed: true });
    expect(state.fellowImpostors).toContain("red");
    expect(state.fellowImpostorRoles).toHaveProperty("red", "Phantom");

    await member.click();
    await page.getByRole("button", { name: "Revive player" }).click();
    state = await getPersistedRoleState(page, "red");
    expect(state.member).toMatchObject({ status: "impostor", isDead: false, isImposter: true, role: "Phantom", roleConfirmed: false });
    expect(state.fellowImpostors).not.toContain("red");
    expect(state.fellowImpostorRoles).not.toHaveProperty("red");
  });
});
