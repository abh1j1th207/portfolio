import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abhijith C — Full-Stack & Frontend Developer",
    short_name: "Abhijith C",
    description:
      "Portfolio of Abhijith C, Full-Stack and Frontend Developer experienced in building enterprise web applications, ERPs, and SPAs.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2ee",
    theme_color: "#f4f2ee",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
