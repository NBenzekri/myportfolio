import { describe, it, expect } from "vitest";
import { validateContact } from "../src/lib/contact-validation";

const base = {
  name: "Jane",
  email: "jane@doe.dev",
  message: "Hello, nice site.",
  website: "",
};

describe("validateContact", () => {
  it("accepts a normal submission and trims fields", () => {
    expect(validateContact({ ...base, name: " Jane " })).toEqual({
      ok: true,
      data: { name: "Jane", email: "jane@doe.dev", message: "Hello, nice site." },
    });
  });

  it("rejects missing fields", () => {
    expect(validateContact({ ...base, name: "   " })).toEqual({
      ok: false,
      error: "missing_fields",
    });
  });

  it("rejects a malformed email", () => {
    expect(validateContact({ ...base, email: "not-an-email" })).toEqual({
      ok: false,
      error: "invalid_email",
    });
  });

  it("rejects oversized messages", () => {
    expect(validateContact({ ...base, message: "x".repeat(5001) })).toEqual({
      ok: false,
      error: "too_long",
    });
  });

  it("rejects oversized emails", () => {
    const longEmail = "a".repeat(250) + "@example.com";
    expect(validateContact({ ...base, email: longEmail })).toEqual({
      ok: false,
      error: "too_long",
    });
  });

  it("flags honeypot submissions as bot", () => {
    expect(validateContact({ ...base, website: "http://spam" })).toEqual({
      ok: false,
      error: "bot",
    });
  });
});
