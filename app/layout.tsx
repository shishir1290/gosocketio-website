import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import DocsLayout from "@/components/DocsLayout";
import ParticleBackground from "@/components/ParticleBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "gsocketio",
  url: "https://gsocketio.vercel.app",
  sameAs: [
    "https://github.com/shishir1290/gsocketio",
    "https://pkg.go.dev/github.com/shishir1290/gsocketio",
    "https://shishir.click",
    "https://shishir1290.netlify.app",
    "https://twitter.com/shishir1290",
    "https://github.com/shishir1290",
  ],
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
    "Pure-Go Socket.IO v4 server with zero dependencies. Manage real-time client connections, broadcast string and binary events, and scale high-throughput streams.",
  author: {
    "@type": "Person",
    name: "Md. Sadmanur Islam Shishir",
    url: "https://shishir.click",
    sameAs: [
      "https://shishir.click",
      "https://shishir1290.netlify.app",
      "https://github.com/shishir1290",
      "https://twitter.com/shishir1290",
    ],
  },
  publisher: {
    "@type": "Person",
    name: "Md. Sadmanur Islam Shishir",
    url: "https://shishir.click",
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
    <html
      lang="en"
      dir="ltr"
      data-theme="dark"
      className={`${plusJakarta.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon fallback tags for all SEO crawlers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon" />

        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}else if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme","dark");document.documentElement.style.colorScheme="dark";}}catch(e){}})();`,
          }}
        />

        {/* Google Analytics (GA4) Integration */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-GSOCKETIO4"}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-GSOCKETIO4"}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ParticleBackground />
          <DocsLayout>{children}</DocsLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
