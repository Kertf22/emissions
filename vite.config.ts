import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPwa: Partial<VitePWAOptions> = {
  registerType: "prompt",
  manifest: {
    theme_color: "#edebe9",
    background_color: "#e8e6e5",
    display: "browser",
    scope: "/",
    start_url: "/",
    name: "Emissions",
    short_name: "Emissions",
    description: "A web app for CO2 Emissons information",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPwa)],
});
