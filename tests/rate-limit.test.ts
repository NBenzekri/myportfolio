import { describe, it, expect, beforeEach } from "vitest";
import { allowSubmission, resetRateLimits } from "../src/lib/rate-limit";

const T0 = 1_000_000_000_000;

describe("allowSubmission", () => {
  beforeEach(() => resetRateLimits());

  it("allows up to 3 submissions per IP inside the window", () => {
    expect(allowSubmission("1.1.1.1", T0)).toBe(true);
    expect(allowSubmission("1.1.1.1", T0 + 1000)).toBe(true);
    expect(allowSubmission("1.1.1.1", T0 + 2000)).toBe(true);
    expect(allowSubmission("1.1.1.1", T0 + 3000)).toBe(false);
  });

  it("frees the IP after the 10 minute window", () => {
    for (let i = 0; i < 3; i++) allowSubmission("1.1.1.1", T0 + i);
    expect(allowSubmission("1.1.1.1", T0 + 10 * 60 * 1000 + 1)).toBe(true);
  });

  it("does not let one IP block another", () => {
    for (let i = 0; i < 3; i++) allowSubmission("1.1.1.1", T0 + i);
    expect(allowSubmission("2.2.2.2", T0 + 10)).toBe(true);
  });

  it("enforces the global cap of 30 per hour across IPs", () => {
    for (let i = 0; i < 30; i++) {
      expect(allowSubmission(`10.0.0.${i}`, T0 + i)).toBe(true);
    }
    expect(allowSubmission("99.99.99.99", T0 + 100)).toBe(false);
  });

  it("frees the global cap after the hour window", () => {
    for (let i = 0; i < 30; i++) allowSubmission(`10.0.0.${i}`, T0 + i);
    expect(allowSubmission("99.99.99.99", T0 + 60 * 60 * 1000 + 20)).toBe(true);
  });
});
