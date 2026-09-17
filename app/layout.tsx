import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gsocketio.vercel.app"),
  title: {
    default: "gsocketio — High-Performance Pure-Go Socket.IO v4 Server",
    template: "%s | gsocketio",
  },
  description:
    "High-performance, zero-dependency Socket.IO v4 and Engine.IO v4 server built purely in Go with RFC 6455 WebSockets and sub-millisecond latency.",
  applicationName: "gsocketio",
  authors: [{ name: "Md. Sadmanur Islam Shishir", url: "https://github.com/shishir1290" }],
  generator: "Next.js",
  keywords: [
    "gsocketio",
    "socket.io go",
    "golang socket.io",
    "socket.io v4",
    "engine.io go",
    "pure go websocket",
    "zero dependency websocket",
    "realtime go server",
    "golang websockets",
    "socketio client go",
  ],
  creator: "Md. Sadmanur Islam Shishir",
  publisher: "gsocketio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "gsocketio — Pure-Go Socket.IO v4 & Engine.IO Server",
    description:
      "High-performance, zero-dependency Socket.IO v4 and Engine.IO v4 server built purely in Go with RFC 6455 WebSockets and sub-millisecond latency.",
    url: "https://gsocketio.vercel.app",
    siteName: "gsocketio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "gsocketio — High-Performance Pure-Go Socket.IO v4 Server",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "gsocketio — Pure-Go Socket.IO v4 Server",
    description:
      "High-performance, zero-dependency Socket.IO v4 and Engine.IO v4 server built purely in Go with RFC 6455 WebSockets and sub-millisecond latency.",
    creator: "@shishir1290",
    images: ["/opengraph-image"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "gsocketio",
  operatingSystem: "Linux, macOS, Windows",
  applicationCategory: "DeveloperApplication",
  programmingLanguage: "Go",
  license: "https://opensource.org/licenses/MIT",
  codeRepository: "https://github.com/shishir1290/gsocketio",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Zero-dependency Socket.IO v4 and Engine.IO v4 server for Go applications built purely with the Go standard library.",
  author: {
    "@type": "Person",
    name: "Md. Sadmanur Islam Shishir",
    url: "https://github.com/shishir1290",
  },
  publisher: {
    "@type": "Person",
    name: "Md. Sadmanur Islam Shishir",
    url: "https://github.com/shishir1290",
  },
  downloadUrl: "https://pkg.go.dev/github.com/shishir1290/gsocketio",
  softwareVersion: "v1.0.4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ParticleBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
