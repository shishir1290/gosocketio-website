import { ImageResponse } from "next/og";

export const alt = "gsocketio — High-Performance Pure-Go Socket.IO v4 Server";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#07090e",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "400px",
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(0,242,254,0.2) 40%, transparent 70%)",
            top: "80px",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 22px",
            borderRadius: "9999px",
            background: "rgba(0, 242, 254, 0.12)",
            border: "1px solid rgba(0, 242, 254, 0.35)",
            color: "#67e8f9",
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "28px",
          }}
        >
          ⚡ ZERO THIRD-PARTY DEPENDENCIES • PURE GO STDLIB
        </div>

        {/* Brand Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "68px",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          <span>gsocketio</span>
          <span
            style={{
              marginLeft: "18px",
              fontSize: "28px",
              color: "#a5b4fc",
              background: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              padding: "4px 14px",
              borderRadius: "9999px",
            }}
          >
            v1.0.4
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "26px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "920px",
            lineHeight: 1.5,
          }}
        >
          High-Performance Socket.IO v4 Server Built Purely in Standard Go.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
