import { FAQ_ITEMS } from "@/components/faq/faq-data";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://gsocketio.vercel.app/#software",
      name: "gsocketio",
      url: "https://gsocketio.vercel.app",
      operatingSystem: "Linux, macOS, Windows",
      applicationCategory: "DeveloperApplication",
      programmingLanguage: "Go",
      license: "https://opensource.org/licenses/MIT",
      codeRepository: "https://github.com/shishir1290/gsocketio",
      downloadUrl: "https://pkg.go.dev/github.com/shishir1290/gsocketio",
      softwareVersion: "v1.0.4",
      description:
        "Pure-Go Socket.IO v4 and Engine.IO v4 server with zero third-party dependencies. RFC 6455 WebSocket framing, HTTP long-polling, room broadcasting, and binary streams.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
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
    },
    {
      "@type": "WebSite",
      "@id": "https://gsocketio.vercel.app/#website",
      url: "https://gsocketio.vercel.app",
      name: "gsocketio — High-Performance Pure-Go Socket.IO v4 Server",
      description: "High-Performance Pure-Go Socket.IO v4 Server with zero third-party dependencies.",
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://gsocketio.vercel.app/#faq",
      mainEntity: FAQ_ITEMS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};
