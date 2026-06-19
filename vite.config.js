import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        id: "/",
        name: "Random",
        short_name: "Streaming Picker",
        description: "Find your next movie or TV show",
        theme_color: "#0f0f0f",
        background_color: "#010101",
        display: "standalone",

        icons: [
          {
            src: "/random-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/random-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
