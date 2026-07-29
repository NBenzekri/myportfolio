import { ImageResponse } from "next/og";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function GET() {
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
            fontSize: 26,
            letterSpacing: "0.2em",
            color: "#c2410c",
            textTransform: "uppercase",
          }}
        >
          Senior Full Stack Engineer · since 2018 · Paris
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 84,
            fontWeight: 800,
            color: "#135263",
            letterSpacing: "-0.02em",
          }}
        >
          Nouriddin Ben Zekri.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "#5a6b71",
          }}
        >
          Java · Spring Boot · Kafka · React · AI assisted engineering
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 60,
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
          nbenzekri.com
        </div>
      </div>
    ),
    size,
  );
}
