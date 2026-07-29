import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { posts } from "../src/data/posts";

describe("posts registry", () => {
  it("every registered slug has a matching app/blog folder", () => {
    for (const p of posts) {
      expect(
        existsSync(join(process.cwd(), "src", "app", "blog", p.slug, "page.tsx")),
        `missing src/app/blog/${p.slug}/page.tsx`,
      ).toBe(true);
    }
  });

  it("dates are valid ISO and sorted newest first", () => {
    const times = posts.map((p) => new Date(p.date).getTime());
    times.forEach((t) => expect(Number.isNaN(t)).toBe(false));
    expect([...times].sort((a, b) => b - a)).toEqual(times);
  });
});
