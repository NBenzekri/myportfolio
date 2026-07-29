import { ImageResponse } from "next/og";
import type { Post } from "@/data/posts";

export const postOgSize = { width: 1200, height: 630 };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

// Shared OG card for blog posts. A new post only needs a 6-line
// opengraph-image.tsx delegating to this.
export function postOgImage(post: Post) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.2em",
            color: "#c2410c",
            textTransform: "uppercase",
          }}
        >
          Blog · {dateFormat.format(new Date(post.date))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#135263",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 180,
            height: 10,
            background: "#e8590c",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 26,
            color: "#3e7a8a",
          }}
        >
          Nouriddin Ben Zekri · nbenzekri.com/blog
        </div>
      </div>
    ),
    postOgSize,
  );
}
