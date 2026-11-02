import { expect, Page } from "@playwright/test";

/**
 * Wait until the shown map image has loaded and the pin overlay has its final
 * size. Map images load lazily; until one arrives the overlay has no height,
 * pins sit at y=0 and drags are ignored, so drag tests must wait for this.
 */
export async function waitForMapImage(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const container = document.querySelector("[data-test='map-container']");
        const overlay = container?.querySelector("[data-test='map-player-tracker']");
        const image = Array.from(container?.querySelectorAll("img") ?? []).find(
          (img) => img.offsetParent !== null
        );
        return Boolean(
          image?.complete &&
            image.naturalWidth > 0 &&
            overlay &&
            overlay.getBoundingClientRect().height > 0
        );
      })
    )
    .toBe(true);
  // Let the overlay's ResizeObserver reposition the pins before reading them.
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
}
