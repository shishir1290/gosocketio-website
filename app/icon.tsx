import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
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
          borderRadius: "8px",
          border: "1.5px solid #00f2fe",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#00f2fe",
            opacity: 0.4,
            filter: "blur(6px)",
          }}
        />

        {/* Dynamic Logo Symbol (G + Zap) */}
        <svg
          viewBox="0 0 32 32"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 'G' Arc */}
          <path
            d="M 22 11 A 9.5 9.5 0 1 0 22 21 L 22 18.5 A 7 7 0 1 1 22 13.5"
            stroke="#00f2fe"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 'G' Bar */}
          <path d="M 15 16 L 24 16" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Lightning / Core */}
          <path
            d="M 17 9 L 14 15 L 18 15 L 15 23 L 21 14 L 17 14 Z"
            fill="#ffffff"
          />
          {/* Top Node */}
          <circle cx="24" cy="10" r="1.5" fill="#00f2fe" />
          {/* Bottom Node */}
          <circle cx="24" cy="22" r="1.5" fill="#a855f7" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
