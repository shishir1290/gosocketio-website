import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gsocketio.vercel.app"),
  title: {
    default: "gsocketio — Pure Go Socket.IO v4 Server | Golang Socket & WebSocket Engine",
    template: "%s | gsocketio",
  },
  description:
    "High-performance pure-Go Socket.IO v4 & WebSocket server with zero dependencies. The modern Go socket library for real-time events, room broadcasting, and Engine.IO transports.",
  applicationName: "gsocketio",
  authors: [{ name: "Md. Sadmanur Islam Shishir", url: "https://shishir.click" }],
  generator: "Next.js",
  keywords: [
    "socket",
    "golang socket",
    "go socket",
    "socket go",
    "socket.io go",
    "golang socket.io",
    "socket.io v4 golang",
    "go socketio",
    "golang websocket",
    "go websocket",
    "pure go websocket",
    "engine.io go",
    "zero dependency websocket server",
    "golang realtime server",
    "socket.io client go",
    "golang websockets rfc 6455",
    "gorilla websocket alternative",
    "socket library go",
    "golang socket server",
    "go socket server",
    "realtime event stream go",
    "gsocketio",
  ],
  creator: "Md. Sadmanur Islam Shishir",
  publisher: "gsocketio",
  category: "technology",
  classification: "Software / Real-Time WebSocket Networking",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://gsocketio.vercel.app",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "gsocketio — Pure Go Socket.IO v4 Server | Golang Socket & WebSocket Engine",
    description:
      "High-performance pure-Go Socket.IO v4 & WebSocket server with zero dependencies. The modern Go socket library for real-time events, room broadcasting, and Engine.IO transports.",
    url: "https://gsocketio.vercel.app",
    siteName: "gsocketio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://gsocketio.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "gsocketio — Pure Go Socket.IO v4 Server",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shishir1290",
    creator: "@shishir1290",
    title: "gsocketio — Pure Go Socket.IO v4 Server | Golang Socket & WebSocket Engine",
    description:
      "High-performance pure-Go Socket.IO v4 & WebSocket server with zero dependencies. The modern Go socket library for real-time events, room broadcasting, and Engine.IO transports.",
    images: ["https://gsocketio.vercel.app/opengraph-image"],
  },
  verification: {
    google: "NYlL9qXs5QyajXegI2kz-9f80CV30H0CJddI9tGA87g",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "revisit-after": "1 days",
    distribution: "global",
    rating: "general",
  },
};
