import { expect, test } from "@playwright/test";
import { applyDictationCommands } from "../../app/utils/dictation";

test.describe("Unit Tests: dictation.ts line-break commands", () => {
  test("standalone commands become line breaks", () => {
    expect(applyDictationCommands("red was in center enter blue vented")).toBe("red was in center\nblue vented");
    expect(applyDictationCommands("red sus new line blue safe")).toBe("red sus\nblue safe");
    expect(applyDictationCommands("red sus newline blue safe")).toBe("red sus\nblue safe");
    expect(applyDictationCommands("Enter red sus")).toBe("\nred sus");
    expect(applyDictationCommands("red sus, enter. blue")).toBe("red sus,\n. blue");
  });

  test("words that contain a command are left alone", () => {
    for (const text of [
      "red was in center",
      "blue entered electrical",
      "the reentering player",
      "es entero",
      "newlines everywhere",
      "énter",
      "enter2",
    ]) {
      expect(applyDictationCommands(text)).toBe(text);
    }
  });

  test("existing line breaks are kept", () => {
    expect(applyDictationCommands("red\nenter\nblue")).toBe("red\n\n\nblue");
  });
});
