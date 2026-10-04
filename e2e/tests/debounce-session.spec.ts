import { expect, test } from "@playwright/test";
import { debounce } from "../../app/utils/debounce";

test.describe("Unit Stress Tests: debounce.ts & Timing Guarantees", () => {
  test("1. High-frequency burst of 1000 rapid calls executes only once with the latest argument", async () => {
    let callCount = 0;
    let lastReceivedArg = "";

    const debouncedFn = debounce((arg: string) => {
      callCount++;
      lastReceivedArg = arg;
    }, 50);

    // Blast 1000 invocations in tight synchronous loop
    for (let i = 1; i <= 1000; i++) {
      debouncedFn(`arg-${i}`);
    }

    // Immediately after the loop, callback must NOT have fired yet
    expect(callCount).toBe(0);

    // Wait for the debounce delay to expire
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Callback must fire exactly once with the last argument
    expect(callCount).toBe(1);
    expect(lastReceivedArg).toBe("arg-1000");
  });

  test("2. Explicit .flush() executes immediately with latest arguments and cancels pending timer", async () => {
    let callCount = 0;
    let lastReceivedArg = 0;

    const debouncedFn = debounce((val: number) => {
      callCount++;
      lastReceivedArg = val;
    }, 100);

    debouncedFn(42);
    expect(callCount).toBe(0);

    // Call flush immediately
    debouncedFn.flush();
    expect(callCount).toBe(1);
    expect(lastReceivedArg).toBe(42);

    // Wait beyond the original 100ms delay — callback must NOT fire a second time
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(callCount).toBe(1);
  });

  test("3. Calling .flush() when nothing is pending is a safe no-op", () => {
    let callCount = 0;
    const debouncedFn = debounce(() => {
      callCount++;
    }, 100);

    // Flush on idle debounce function
    expect(() => debouncedFn.flush()).not.toThrow();
    expect(callCount).toBe(0);
  });

  test("4. Explicit .cancel() aborts pending execution cleanly", async () => {
    let callCount = 0;
    const debouncedFn = debounce(() => {
      callCount++;
    }, 50);

    debouncedFn();
    expect(callCount).toBe(0);

    debouncedFn.cancel();

    await new Promise((resolve) => setTimeout(resolve, 80));
    expect(callCount).toBe(0);
  });

  test("5. Consecutive waves of activity trigger exactly once per settled wave", async () => {
    const receivedWaveValues: number[] = [];
    const debouncedFn = debounce((waveId: number) => {
      receivedWaveValues.push(waveId);
    }, 40);

    // Wave 1
    for (let i = 1; i <= 10; i++) debouncedFn(1);
    await new Promise((resolve) => setTimeout(resolve, 70));

    // Wave 2
    for (let i = 1; i <= 10; i++) debouncedFn(2);
    await new Promise((resolve) => setTimeout(resolve, 70));

    // Wave 3
    for (let i = 1; i <= 10; i++) debouncedFn(3);
    await new Promise((resolve) => setTimeout(resolve, 70));

    expect(receivedWaveValues).toEqual([1, 2, 3]);
  });
});
