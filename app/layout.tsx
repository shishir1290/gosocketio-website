import Script from "next/script";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import DocsLayout from "@/components/DocsLayout";
import ParticleBackground from "@/components/ParticleBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import { metadata, viewport } from "./site-metadata";
import { jsonLd } from "./site-jsonld";

export { metadata, viewport };

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

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}else if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme","dark");document.documentElement.style.colorScheme="dark";}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-GSOCKETIO4";

  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="dark"
      className={`${plusJakarta.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon" />

        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

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
