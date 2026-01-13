import { describe, expect, it } from "bun:test";
import { formatDate, truncateText } from "@/lib/helpers";

describe("Helper Functions", () => {
  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2025-01-13");
      const result = formatDate(date);
      expect(result).toContain("January");
      expect(result).toContain("2025");
    });
  });

  describe("truncateText", () => {
    it("should truncate text when exceeds length", () => {
      const text = "This is a long text that should be truncated";
      const result = truncateText(text, 10);
      expect(result).toBe("This is a ...");
    });

    it("should not truncate text when within length", () => {
      const text = "Short";
      const result = truncateText(text, 10);
      expect(result).toBe("Short");
    });
  });
});
