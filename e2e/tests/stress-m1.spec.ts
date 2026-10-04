import { expect, test } from "../fixtures/base";
import { activateAllCrew } from "../helpers/crew";
import { openNotes } from "../helpers/modals";

test.describe("M1 Stress Test Suite: Map Pin Dragging & Detective Notepad Debounce", () => {
  // --------------------------------------------------------------------------
  // Map Pin Dragging Stress Tests
  // --------------------------------------------------------------------------
  test.describe("Map Pin Dragging (MapPlayerTracker.vue)", () => {
    test.beforeEach(async ({ page }) => {
      await activateAllCrew(page);
      // Ensure map is visible
      const mapContainer = page.locator("[data-test='map-container']");
      if (!(await mapContainer.isVisible())) {
        await page.click("[data-test='toggle-map-btn']");
        await expect(mapContainer).toBeVisible();
      }
    });

    test("1. Rapid pointer movement updates inline style at 60fps and only commits to store on dragEnd", async ({
      page,
    }) => {
      const pin = page.locator("[data-test='map-player-blue']");
      await expect(pin).toHaveAttribute("data-moveable-ready", "true");
      await pin.evaluate((element) => element.scrollIntoView({ block: "center" }));
      await expect(pin).toBeVisible();

      // Check initial default coordinates in DOM
      const defaultX = Number(await pin.getAttribute("data-position-x"));

      const pinBox = await pin.boundingBox();
      expect(pinBox).not.toBeNull();
      const startX = pinBox!.x + pinBox!.width / 2;
      const startY = pinBox!.y + pinBox!.height / 2;

      // Track localStorage writes to roundsStore during pointer movement
      await page.evaluate(() => {
        (window as any).__roundsStoreWriteCount = 0;
        const origSetItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = (key: string, value: string) => {
          if (key === "rounds") {
            (window as any).__roundsStoreWriteCount =
              ((window as any).__roundsStoreWriteCount || 0) + 1;
          }
          return origSetItem(key, value);
        };
      });

      // Rapid pointer movements (simulating rapid mouse movement across 10 steps)
      await page.mouse.move(startX, startY);
      await page.mouse.down();

      for (let i = 1; i <= 10; i++) {
        await page.mouse.move(startX + i * 14, startY + i * 8);
      }

      // While pointer is still down, verify inline style is applied on DOM target
      const inlineStyleDuringDrag = await pin.getAttribute("style");
      expect(inlineStyleDuringDrag).toContain("translate");

      // Verify that during drag movement, rounds store was NOT written on every step
      const writesDuringDrag = await page.evaluate(
        () => (window as any).__roundsStoreWriteCount || 0
      );
      // Even with 10 movements, writes should be 0 because store update is deferred to dragEnd
      expect(writesDuringDrag).toBe(0);

      // Release pointer (trigger dragEnd)
      await page.mouse.up();
      await page.waitForTimeout(100);

      // Verify write occurred on dragEnd
      const writesAfterDragEnd = await page.evaluate(
        () => (window as any).__roundsStoreWriteCount || 0
      );
      expect(writesAfterDragEnd).toBeGreaterThanOrEqual(1);

      // Verify localStorage has the persisted position
      const roundsData = await page.evaluate(() => {
        const raw = localStorage.getItem("rounds");
        return raw ? JSON.parse(raw) : null;
      });
      expect(roundsData).not.toBeNull();
      const currentMapPositions = roundsData.currentMapPositions || {};
      const skeldPositions = currentMapPositions["the-skeld"] || {};
      const posKeys = Object.keys(skeldPositions);
      expect(posKeys.length).toBeGreaterThan(0);
      expect(skeldPositions[posKeys[0]]).toHaveProperty("x");
      expect(skeldPositions[posKeys[0]]).toHaveProperty("y");
      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .not.toBe(defaultX);
    });

    test("2. Releasing pointer outside map container correctly commits dragEnd and maintains coordinates", async ({
      page,
    }) => {
      const pin = page.locator("[data-test='map-player-blue']");
      await expect(pin).toHaveAttribute("data-moveable-ready", "true");
      await pin.evaluate((element) => element.scrollIntoView({ block: "center" }));
      await expect(pin).toBeVisible();

      const defaultX = Number(await pin.getAttribute("data-position-x"));

      const pinBox = await pin.boundingBox();
      expect(pinBox).not.toBeNull();
      const startX = pinBox!.x + pinBox!.width / 2;
      const startY = pinBox!.y + pinBox!.height / 2;

      await page.mouse.move(startX, startY);
      await page.mouse.down();

      // Drag 150px right and 80px down across container boundary
      await page.mouse.move(startX + 150, startY + 80, { steps: 8 });
      await page.mouse.up();

      await page.waitForTimeout(100);

      // Check pin style
      const pinStyle = await pin.getAttribute("style");
      expect(pinStyle).toContain("translate");

      // Check persisted state in roundsStore
      const roundsData = await page.evaluate(() => {
        const raw = localStorage.getItem("rounds");
        return raw ? JSON.parse(raw) : null;
      });
      expect(roundsData).not.toBeNull();
      const skeldPositions = roundsData.currentMapPositions?.["the-skeld"] || {};
      const posKeys = Object.keys(skeldPositions);
      expect(posKeys.length).toBeGreaterThan(0);
      expect(skeldPositions[posKeys[0]]).toHaveProperty("x");
      expect(skeldPositions[posKeys[0]]).toHaveProperty("y");
      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .not.toBe(defaultX);
    });

    test("3. Reset positions button clears DOM inline transforms, clears store, and allows re-dragging cleanly", async ({
      page,
    }) => {
      const pin = page.locator("[data-test='map-player-blue']");
      await expect(pin).toHaveAttribute("data-moveable-ready", "true");
      await pin.evaluate((element) => element.scrollIntoView({ block: "center" }));
      await expect(pin).toBeVisible();

      const defaultX = Number(await pin.getAttribute("data-position-x"));
      const defaultY = Number(await pin.getAttribute("data-position-y"));

      // Drag to offset
      const pinBox = await pin.boundingBox();
      const startX = pinBox!.x + pinBox!.width / 2;
      const startY = pinBox!.y + pinBox!.height / 2;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 140, startY + 85, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(100);

      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .not.toBe(defaultX);

      // Click "Reset positions"
      const resetBtn = page.locator("[data-test='reset-map-positions-btn']");
      await expect(resetBtn).toBeVisible();
      await resetBtn.click();
      await page.waitForTimeout(100);

      // Verify coordinate returned to default
      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .toBeCloseTo(defaultX, 5);
      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-y")))
        .toBeCloseTo(defaultY, 5);

      // Verify store for current map is cleared
      const roundsData = await page.evaluate(() => {
        const raw = localStorage.getItem("rounds");
        return raw ? JSON.parse(raw) : null;
      });
      expect(roundsData?.currentMapPositions?.["the-skeld"] || {}).toEqual({});

      // Now re-drag the pin again — verify Moveable starts cleanly from origin
      const newPinBox = await pin.boundingBox();
      const reStartX = newPinBox!.x + newPinBox!.width / 2;
      const reStartY = newPinBox!.y + newPinBox!.height / 2;
      await page.mouse.move(reStartX, reStartY);
      await page.mouse.down();
      await page.mouse.move(reStartX + 120, reStartY + 60, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(100);

      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .not.toBe(defaultX);

      const roundsAfterReDrag = await page.evaluate(() => {
        const raw = localStorage.getItem("rounds");
        return raw ? JSON.parse(raw) : null;
      });
      const rePositions = roundsAfterReDrag?.currentMapPositions?.["the-skeld"] || {};
      expect(Object.keys(rePositions).length).toBeGreaterThan(0);
    });

    test("4. Map pin snapshot viewing: pins reset on New round, historical positions are read-only, and live round restores", async ({
      page,
    }) => {
      const pin = page.locator("[data-test='map-player-blue']");
      await expect(pin).toHaveAttribute("data-moveable-ready", "true");
      await pin.evaluate((element) => element.scrollIntoView({ block: "center" }));
      await expect(pin).toBeVisible();

      const defaultX = Number(await pin.getAttribute("data-position-x"));

      // Drag pin in Round 1
      const pinBox = await pin.boundingBox();
      const startX = pinBox!.x + pinBox!.width / 2;
      const startY = pinBox!.y + pinBox!.height / 2;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 140, startY + 85, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(100);

      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .not.toBe(defaultX);
      const r1X = Number(await pin.getAttribute("data-position-x"));

      // Advance to Round 2
      await page.click("[data-test='new-round-btn']");
      await page.waitForTimeout(100);

      // In Round 2, pin should be reset back to default position
      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .toBeCloseTo(defaultX, 5);

      // Verify Round 2 store map positions are empty
      const r2Store = await page.evaluate(() => {
        const raw = localStorage.getItem("rounds");
        return raw ? JSON.parse(raw) : null;
      });
      expect(r2Store.currentMapPositions || {}).toEqual({});
      expect(r2Store.roundHistory.length).toBe(1);
      expect(r2Store.roundHistory[0].mapPositions).not.toBeNull();

      // View Round 1 Snapshot via timeline button
      const r1Btn = page.locator("button:has-text('R1')").first();
      await expect(r1Btn).toBeVisible();
      await r1Btn.click();
      await page.waitForTimeout(150);

      // Verify snapshot banner is shown
      await expect(
        page.locator("text=Round 1 Map Snapshot (Read-Only)")
      ).toBeVisible();

      // Verify "Reset positions" button is NOT rendered in history mode
      await expect(
        page.locator("[data-test='reset-map-positions-btn']")
      ).not.toBeVisible();

      // Verify pin in Round 1 snapshot has the restored transform / coordinate
      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .toBeCloseTo(r1X, 5);

      // Return to Live round
      const liveBtn = page.locator("button:has-text('Live')").first();
      if (await liveBtn.isVisible()) {
        await liveBtn.click();
      } else {
        const returnLink = page.locator("text=Return to live").first();
        if (await returnLink.isVisible()) {
          await returnLink.click();
        }
      }
      await page.waitForTimeout(150);

      // Verify returned to Round 2 live state: pin should have Round 2 coordinate (default)
      await expect
        .poll(async () => Number(await pin.getAttribute("data-position-x")))
        .toBeCloseTo(defaultX, 5);
    });
  });

  // --------------------------------------------------------------------------
  // Detective Notepad Debounce Stress Tests
  // --------------------------------------------------------------------------
  test.describe("Detective Notepad Debouncing (DetectiveNotepad.vue)", () => {
    test.beforeEach(async ({ page }) => {
      await openNotes(page);
    });

    test("5. Rapid typing debounces writes: no writes during burst, persists after 200ms settling", async ({
      page,
    }) => {
      const roundNotes = page.locator("#round-notes");
      await expect(roundNotes).toBeVisible();

      // Instrument localStorage.setItem to count 'notes' writes
      await page.evaluate(() => {
        (window as any).__notesWriteCount = 0;
        const origSetItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = (key: string, value: string) => {
          if (key === "notes") {
            (window as any).__notesWriteCount =
              ((window as any).__notesWriteCount || 0) + 1;
          }
          return origSetItem(key, value);
        };
      });

      // Simulate 15 rapid keystroke input events within a 10ms window
      await page.evaluate(() => {
        const el = document.querySelector("#round-notes") as HTMLTextAreaElement;
        el.focus();
        for (let i = 1; i <= 15; i++) {
          el.value = "Rapid burst note step " + i;
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });

      // Check immediately (0ms wait) — store must NOT have been written for each keystroke
      const immediateWrites = await page.evaluate(
        () => (window as any).__notesWriteCount || 0
      );
      expect(immediateWrites).toBe(0);

      // Wait 300ms for the 200ms debounce timer to fire
      await page.waitForTimeout(300);

      // Verify exactly 1 write occurred after settling
      const writesAfterSettling = await page.evaluate(
        () => (window as any).__notesWriteCount || 0
      );
      expect(writesAfterSettling).toBe(1);

      // Verify the final text was correctly committed to localStorage
      const notesData = await page.evaluate(() => {
        const raw = localStorage.getItem("notes");
        return raw ? JSON.parse(raw) : null;
      });
      expect(notesData?.roundNotes).toBe("Rapid burst note step 15");
    });

    test("6. Immediate blur flushes pending debounce without data loss (no wait required)", async ({
      page,
    }) => {
      const roundNotes = page.locator("#round-notes");
      await expect(roundNotes).toBeVisible();

      await roundNotes.focus();
      const testText = "Important clue before blur";
      await roundNotes.fill(testText);

      // IMMEDIATELY blur without waiting for 200ms debounce
      await roundNotes.blur();

      // Check localStorage right away (0ms wait)
      const notesData = await page.evaluate(() => {
        const raw = localStorage.getItem("notes");
        return raw ? JSON.parse(raw) : null;
      });
      expect(notesData?.roundNotes).toBe(testText);
    });

    test("7. Minimizing notepad flushes pending debounced notes immediately", async ({
      page,
    }) => {
      const gameNotes = page.locator("#game-notes");
      await expect(gameNotes).toBeVisible();

      await gameNotes.focus();
      const secretNote = "Impostor is definitely lime";
      await gameNotes.fill(secretNote);

      // Immediately click minimize button
      await page.click("[data-test='notes-minimize-btn']");
      await expect(gameNotes).not.toBeVisible();

      // Verify store persisted immediately
      const notesData = await page.evaluate(() => {
        const raw = localStorage.getItem("notes");
        return raw ? JSON.parse(raw) : null;
      });
      expect(notesData?.gameNotes).toBe(secretNote);
    });

    test("8. Rapid typing followed immediately by New round flushes notes into snapshot and inherits in round 2", async ({
      page,
    }) => {
      const roundNotes = page.locator("#round-notes");
      await expect(roundNotes).toBeVisible();

      await roundNotes.focus();
      const round1Notes = "Red and Blue were together in navigation";
      await roundNotes.fill(round1Notes);

      // Activate crew and immediately advance round
      await activateAllCrew(page);
      await page.click("[data-test='new-round-btn']");
      await page.waitForTimeout(100);

      // Re-open notes if closed
      await openNotes(page);

      // Verify Round 2 inherited the notes
      await expect(page.locator("#round-notes")).toHaveValue(round1Notes);

      // Verify Round 1 snapshot in history also captured the notes
      const roundsData = await page.evaluate(() => {
        const raw = localStorage.getItem("rounds");
        return raw ? JSON.parse(raw) : null;
      });
      expect(roundsData?.roundHistory?.[0]?.roundNotes).toBe(round1Notes);
    });

    test("9. Clicking outside / switching focus to board immediately flushes pending debounced notes", async ({
      page,
    }) => {
      const gameNotes = page.locator("#game-notes");
      await expect(gameNotes).toBeVisible();

      await gameNotes.focus();
      const clickOutsideNote = "Notes before clicking outside";
      await gameNotes.fill(clickOutsideNote);

      // Immediately click outside on another element (e.g. Tasks button)
      await page.click("[data-test='tasks-btn']:visible");

      // Verify notes were flushed and persisted immediately
      const notesData = await page.evaluate(() => {
        const raw = localStorage.getItem("notes");
        return raw ? JSON.parse(raw) : null;
      });
      expect(notesData?.gameNotes).toBe(clickOutsideNote);

      // Close modal
      await page.click("[role='dialog'] button[aria-label='Close']");
    });

    test("10. History snapshot viewing does not overwrite live notes draft", async ({
      page,
    }) => {
      const roundNotes = page.locator("#round-notes");
      await expect(roundNotes).toBeVisible();

      // Write Round 1 notes and advance
      await roundNotes.fill("Round 1 verified facts");
      await activateAllCrew(page);
      await page.click("[data-test='new-round-btn']");
      await page.waitForTimeout(100);

      await openNotes(page);

      // Write Round 2 draft notes
      await roundNotes.fill("Round 2 working hypotheses");
      await roundNotes.blur();

      // View Round 1 history snapshot
      const r1Btn = page.locator("button:has-text('R1')").first();
      await expect(r1Btn).toBeVisible();
      await r1Btn.click();
      await page.waitForTimeout(150);

      // Verify snapshot shows Round 1 notes and is readonly
      await expect(roundNotes).toHaveValue("Round 1 verified facts");
      await expect(roundNotes).toHaveAttribute("readonly");

      // Return to live round
      const liveBtn = page.locator("button:has-text('Live')").first();
      if (await liveBtn.isVisible()) {
        await liveBtn.click();
      } else {
        const returnLink = page.locator("text=Return to live").first();
        if (await returnLink.isVisible()) {
          await returnLink.click();
        }
      }
      await page.waitForTimeout(150);

      // Verify Round 2 draft notes are restored and editable
      await expect(roundNotes).toHaveValue("Round 2 working hypotheses");
      await expect(roundNotes).not.toHaveAttribute("readonly");
    });
  });
});
