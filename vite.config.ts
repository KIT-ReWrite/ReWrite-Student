import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            disable: false,
            registerType: "autoUpdate",

            devOptions: {
                enabled: true,
            },

            includeAssets: [
                "icons/favicon.ico",
                "icons/icon-192.png",
                "icons/icon-512.png",
                "splash/apple-touch-icon.png",
            ],

            manifest: {
                name: "Re:Write",
                short_name: "Re:Write",
                start_url: "/",
                theme_color: "#000000",
                background_color: "#ffffff",
                display: "standalone",
                icons: [
                    {
                        src: "icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@app": path.resolve(__dirname, "src/app"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@entities": path.resolve(__dirname, "src/entities"),
            "@features": path.resolve(__dirname, "src/features"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@shared": path.resolve(__dirname, "src/shared"),
            "@widget": path.resolve(__dirname, "src/widget"),
        },
    },
})
