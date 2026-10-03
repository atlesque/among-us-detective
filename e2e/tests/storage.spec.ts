import { expect, test } from "@playwright/test";

test("corrupt startup flags do not prevent the board from loading", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem("appInstallationDismissed", "{invalid");
    localStorage.setItem("returningPlayer", "{invalid");
    localStorage.setItem("acceptedCookies", "true");
  });
  await page.goto("/");
  await expect(page.locator("[data-test='new-game-btn']")).toBeVisible();
  await expect(page.locator("[data-test='crew-column-unknown']")).toBeVisible();
  expect(errors).toEqual([]);
});

test("restricted startup flag storage still permits loading and dismissing the notice", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    // Block the app's startup flags without interfering with development-only
    // Vue tooling that requires its own storage during module initialization.
    const blockedKeys = new Set(["appInstallationDismissed", "returningPlayer", "acceptedCookies"]);
    for (const method of ["getItem", "setItem"] as const) {
      const original = Storage.prototype[method];
      Object.defineProperty(Storage.prototype, method, {
        value: function (this: Storage, key: string, ...args: string[]) {
          if (blockedKeys.has(key)) throw new DOMException("Storage blocked", "SecurityError");
          return Reflect.apply(original, this, [key, ...args]);
        },
      });
    }
  });
  await page.goto("/");
  await expect(page.locator("[data-test='new-game-btn']")).toBeVisible();
  await expect(page.locator("[data-test='cookie-warning']")).toBeVisible();
  await page.locator("[data-test='cookie-dismiss-btn']").click();
  await expect(page.locator("[data-test='cookie-warning']")).toBeHidden();
  expect(errors).toEqual([]);
});
