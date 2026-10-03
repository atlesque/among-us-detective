import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";

test.describe("Map display and selection", () => {
  test("Map is hidden by default; Show map button is visible", async ({
    page,
  }) => {
    await expect(page.locator("[data-test='map-container']")).not.toBeVisible();
    await expect(
      page.locator("[data-test='toggle-map-btn']").first()
    ).toBeVisible();
  });

  test("Clicking Show map reveals the map container", async ({ page }) => {
    await page.click("[data-test='toggle-map-btn']");
    await expect(page.locator("[data-test='map-container']")).toBeVisible();
  });

  test("Clicking Hide map hides the map container again", async ({ page }) => {
    await page.click("[data-test='toggle-map-btn']"); // show
    // After showing, click the now-visible "Hide map" button specifically
    await page.locator("[data-test='toggle-map-btn']:visible").first().click(); // hide
    await expect(page.locator("[data-test='map-container']")).not.toBeVisible();
  });

  test("Map selector is visible when map is shown", async ({ page }) => {
    await page.click("[data-test='toggle-map-btn']");
    await expect(
      page.locator("[data-test='map-selector']").first()
    ).toBeVisible();
  });

  test.describe("Map switching", () => {
    test.beforeEach(async ({ page }) => {
      await page.click("[data-test='toggle-map-btn']");
    });

    test("The Skeld is selected by default", async ({ page }) => {
      await expect(
        page.locator("[data-test='map-btn-the-skeld']").first()
      ).toHaveClass(/bg-emerald-600/);
    });

    test("Selecting Mira HQ activates its button", async ({ page }) => {
      await page
        .locator("[data-test='map-btn-mira-hq']")
        .first()
        .click();
      await expect(
        page.locator("[data-test='map-btn-mira-hq']").first()
      ).toHaveClass(/bg-emerald-600/);
      await expect(
        page.locator("[data-test='map-btn-the-skeld']").first()
      ).not.toHaveClass(/bg-emerald-600/);
    });

    test("Selecting Polus activates its button", async ({ page }) => {
      await page
        .locator("[data-test='map-btn-polus']")
        .first()
        .click();
      await expect(
        page.locator("[data-test='map-btn-polus']").first()
      ).toHaveClass(/bg-emerald-600/);
    });

    test("Selecting The Airship activates its button", async ({ page }) => {
      await page
        .locator("[data-test='map-btn-the-airship']")
        .first()
        .click();
      await expect(
        page.locator("[data-test='map-btn-the-airship']").first()
      ).toHaveClass(/bg-emerald-600/);
    });

    test("Selecting The Fungle activates its button", async ({ page }) => {
      await page
        .locator("[data-test='map-btn-the-fungle']")
        .first()
        .click();
      await expect(
        page.locator("[data-test='map-btn-the-fungle']").first()
      ).toHaveClass(/bg-emerald-600/);
    });

    test("Mira HQ shows a Show/Hide sensors button", async ({ page }) => {
      await page
        .locator("[data-test='map-btn-mira-hq']")
        .first()
        .click();
      await expect(
        page.locator("[data-test='toggle-sensors-btn']")
      ).toBeVisible();
    });

    test("Mira HQ sensors toggle shows and hides the overlay", async ({
      page,
    }) => {
      await page
        .locator("[data-test='map-btn-mira-hq']")
        .first()
        .click();
      await page.click("[data-test='toggle-sensors-btn']");
      // After showing sensors, button text changes to "Hide sensors"
      await expect(page.locator("[data-test='toggle-sensors-btn']")).toHaveText(
        "Hide sensors"
      );
      await page.click("[data-test='toggle-sensors-btn']");
      await expect(page.locator("[data-test='toggle-sensors-btn']")).toHaveText(
        "Show sensors"
      );
    });
  });

  test("map positions stay with their map and scale with the displayed image", async ({
    page,
  }) => {
    await activateAllCrew(page);
    await page.click("[data-test='toggle-map-btn']");

    const map = page.locator("[data-test='map-container']");
    const player = page.locator("[data-test='map-player-blue']");
    await expect(map).toHaveAttribute("data-map-id", "the-skeld");
    await expect(player).toHaveAttribute("data-moveable-ready", "true");
    await player.evaluate((element) => element.scrollIntoView({ block: "center" }));

    const defaultX = Number(await player.getAttribute("data-position-x"));
    const playerBox = await player.boundingBox();
    if (!playerBox) throw new Error("Blue map marker is not visible");

    await page.mouse.move(playerBox.x + playerBox.width / 2, playerBox.y + playerBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(
      playerBox.x + playerBox.width / 2 + 140,
      playerBox.y + playerBox.height / 2 + 85,
      { steps: 8 }
    );
    await page.mouse.up();

    await expect
      .poll(async () => Number(await player.getAttribute("data-position-x")))
      .not.toBe(defaultX);
    const savedX = Number(await player.getAttribute("data-position-x"));
    const savedY = Number(await player.getAttribute("data-position-y"));

    const beforeResize = await page.locator("[data-test='map-player-tracker']").boundingBox();
    if (!beforeResize) throw new Error("Map overlay is not visible");
    await page.setViewportSize({ width: 900, height: 800 });
    await expect
      .poll(async () => {
        const overlay = await page.locator("[data-test='map-player-tracker']").boundingBox();
        const marker = await player.boundingBox();
        if (!overlay || !marker || overlay.width >= beforeResize.width) return 1;
        return Math.max(
          Math.abs((marker.x - overlay.x) / overlay.width - savedX),
          Math.abs((marker.y - overlay.y) / overlay.height - savedY)
        );
      })
      .toBeLessThan(0.03);

    await page.locator("[data-test='map-btn-polus']").click();
    await expect(map).toHaveAttribute("data-map-id", "polus");
    await expect(player).toHaveAttribute("data-moveable-ready", "true");
    await expect
      .poll(async () => Number(await player.getAttribute("data-position-x")))
      .toBeCloseTo(defaultX, 5);
    await page.locator("[data-test='reset-map-positions-btn']").click();

    await page.locator("[data-test='map-btn-the-skeld']").click();
    await expect(map).toHaveAttribute("data-map-id", "the-skeld");
    await expect
      .poll(async () => Number(await player.getAttribute("data-position-x")))
      .toBeCloseTo(savedX, 5);

    await page.click("[data-test='new-game-btn']");
    await expect
      .poll(async () => Number(await player.getAttribute("data-position-x")))
      .toBeCloseTo(defaultX, 5);
  });

  test("round history restores its map and keeps the live selection read-only", async ({
    page,
  }) => {
    await activateAllCrew(page);
    await page.click("[data-test='toggle-map-btn']");
    await page.locator("[data-test='map-btn-polus']").click();

    const player = page.locator("[data-test='map-player-blue']");
    await expect(player).toHaveAttribute("data-moveable-ready", "true");
    await player.evaluate((element) => element.scrollIntoView({ block: "center" }));
    const playerBox = await player.boundingBox();
    if (!playerBox) throw new Error("Blue map marker is not visible");
    await page.mouse.move(playerBox.x + playerBox.width / 2, playerBox.y + playerBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(
      playerBox.x + playerBox.width / 2 + 110,
      playerBox.y + playerBox.height / 2 + 65,
      { steps: 8 }
    );
    await page.mouse.up();
    await expect
      .poll(async () => Number(await player.getAttribute("data-position-x")))
      .not.toBe(0.18);
    const archivedX = Number(await player.getAttribute("data-position-x"));

    await page.click("[data-test='new-round-btn']");
    await page.locator("[data-test='map-btn-mira-hq']").click();
    await page.locator("header button").filter({ hasText: "R1" }).first().click();

    const map = page.locator("[data-test='map-container']");
    await expect(map).toHaveAttribute("data-map-id", "polus");
    await expect(page.locator("[data-test='map-player-tracker']")).toHaveAttribute(
      "data-map-id",
      "polus"
    );
    await expect(page.locator("[data-test='map-btn-polus']")).toBeDisabled();
    await expect
      .poll(async () => Number(await player.getAttribute("data-position-x")))
      .toBeCloseTo(archivedX, 5);

    await page.locator("header button").filter({ hasText: "R2" }).first().click();
    await expect(map).toHaveAttribute("data-map-id", "mira-hq");
    await expect(page.locator("[data-test='map-btn-mira-hq']")).toBeEnabled();
    await page.locator("[data-test='map-btn-polus']").click();
    await expect(map).toHaveAttribute("data-map-id", "polus");
    await expect
      .poll(async () => Number(await player.getAttribute("data-position-x")))
      .toBeCloseTo(0.18, 5);
  });

  test("legacy pixel transforms show no guessed historical map or live position", async ({
    page,
  }) => {
    await activateAllCrew(page);
    const savedState = await page.evaluate(() => {
      const crew = JSON.parse(localStorage.getItem("crew") || "{}");

      const rounds = {
        currentRoundNumber: 2,
        viewingRoundNumber: 1,
        roundHistory: [
          {
            roundNumber: 1,
            timestamp: Date.now(),
            crewMembers: crew.crewMembers || [],
            roundNotes: "",
            mapPositions: { blue: "translate(100000px, 100000px)" },
          },
        ],
        currentMapPositions: { blue: "translate(100000px, 100000px)" },
      };

      return { crew, rounds };
    });

    await page.evaluate((state) => {
      sessionStorage.setItem("map-test-legacy-state", JSON.stringify(state));
    }, savedState);
    await page.addInitScript(() => {
      const saved = sessionStorage.getItem("map-test-legacy-state");
      if (!saved) return;
      const state = JSON.parse(saved);
      localStorage.setItem("crew", JSON.stringify(state.crew));
      localStorage.setItem("rounds", JSON.stringify(state.rounds));
      sessionStorage.removeItem("map-test-legacy-state");
    });

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-test='new-game-btn']", { state: "attached" });

    await page.locator("header button").filter({ hasText: "R2" }).first().click();
    await page.click("[data-test='toggle-map-btn']");
    await page.locator("[data-test='map-btn-mira-hq']").click();

    const map = page.locator("[data-test='map-container']");
    await expect(map).toBeVisible();
    await expect(map).toHaveAttribute("data-map-id", "mira-hq");

    await page.locator("header button").filter({ hasText: "R1" }).first().click();
    await expect(map).toHaveAttribute("data-map-id", "");
    await expect(page.locator("[data-test='map-snapshot-unavailable']")).toBeVisible();
    await expect(page.locator("[data-test='map-player-tracker']")).toHaveCount(0);
    await expect(page.locator("[data-test='map-btn-the-skeld']")).toBeDisabled();

    await page.locator("header button").filter({ hasText: "R2" }).first().click();
    await expect(map).toHaveAttribute("data-map-id", "mira-hq");
    await expect(page.locator("[data-test='map-btn-mira-hq']")).toBeEnabled();
    await expect(page.locator("[data-test='map-player-blue']")).toHaveAttribute(
      "data-position-x",
      "0.18"
    );
  });
});
