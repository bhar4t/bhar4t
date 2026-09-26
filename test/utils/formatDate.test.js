import { describe, it, expect } from "vitest";
import formatDate from "../../utils/formatDate";

describe("formatDate", () => {
  it("formats a YYYY-MM-DD string as a full month name, day, year", () => {
    expect(formatDate("2021-04-05")).toBe("April 5, 2021");
  });

  it("does not zero-pad the day", () => {
    expect(formatDate("2026-09-06")).toBe("September 6, 2026");
  });

  it("handles every month name correctly", () => {
    expect(formatDate("2024-01-01")).toBe("January 1, 2024");
    expect(formatDate("2024-12-31")).toBe("December 31, 2024");
  });
});
