import { ImageResponse } from "next/og";


// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1120 0%, #07090e 50%, #0f172a 100%)",
          borderRadius: "40px",
          border: "4px solid #00f2fe",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#00f2fe",
            opacity: 0.35,
            filter: "blur(20px)",
          }}
        />

        {/* Dynamic Logo Symbol (G + Zap) */}
        <svg
          viewBox="0 0 128 128"
          width="128"
          height="128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 'G' Arc */}
          <path
            d="M 88 44 A 38 38 0 1 0 88 84 L 88 74 A 28 28 0 1 1 88 54"
            stroke="#00f2fe"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 'G' Bar */}
          <path d="M 60 64 L 94 64" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
          {/* Lightning / Core */}
          <path
            d="M 67 36 L 55 60 L 69 60 L 59 90 L 81 56 L 69 56 Z"
            fill="#ffffff"
          />
          {/* Top Node */}
          <circle cx="96" cy="42" r="5" fill="#00f2fe" />
          {/* Bottom Node */}
          <circle cx="96" cy="86" r="5" fill="#a855f7" />
          <circle cx="106" cy="64" r="3.5" fill="#38bdf8" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
