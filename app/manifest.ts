import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "gsocketio — Pure-Go Socket.IO v4 Server",
    short_name: "gsocketio",
    description: "Zero-dependency Socket.IO v4 and Engine.IO v4 server built purely in Go.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090e",
    theme_color: "#00f2fe",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
