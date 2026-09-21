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
    default: "gsocketio — High-Performance Go Socket.IO v4 Server for Real-Time Client Connections & Events",
    template: "%s | gsocketio",
  },
  description:
    "Pure-Go Socket.IO v4 server with zero dependencies. Manage real-time client connections, broadcast string and binary events, and scale high-throughput streams.",
  applicationName: "gsocketio",
  authors: [
    { name: "Md. Sadmanur Islam Shishir", url: "https://shishir.click" },
  ],
  generator: "Next.js",
  keywords: [
    "gsocketio",
    "socket.io go",
    "golang socket.io",
    "socket.io v4",
    "client connection",
    "realtime event stream",
    "string event broadcast",
    "engine.io go",
    "pure go websocket",
    "zero dependency websocket",
    "realtime go server",
    "golang websockets",
    "socketio client go",
  ],
  creator: "Md. Sadmanur Islam Shishir",
  publisher: "gsocketio",
  category: "technology",
  classification: "Software / Real-Time WebSocket Networking",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "gsocketio — High-Performance Go Socket.IO v4 Server for Real-Time Client Connections & Events",
    description:
      "Pure-Go Socket.IO v4 server with zero dependencies. Manage real-time client connections, broadcast string and binary events, and scale high-throughput streams.",
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
        alt: "gsocketio — High-Performance Pure-Go Socket.IO v4 Server",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shishir1290",
    creator: "@shishir1290",
    title: "gsocketio — High-Performance Go Socket.IO v4 Server for Real-Time Client Connections & Events",
    description:
      "Pure-Go Socket.IO v4 server with zero dependencies. Manage real-time client connections, broadcast string and binary events, and scale high-throughput streams.",
    images: ["https://gsocketio.vercel.app/opengraph-image"],
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
    "revisit-after": "7 days",
    distribution: "global",
    rating: "general",
  },
};
