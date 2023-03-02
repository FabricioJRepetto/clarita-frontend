/*
    ? instalar dependencias para eslint:
        npm install eslint eslint-config-react-app vite-plugin-eslint --save-dev
    ? pegar archivo .eslintrc.json en el root del proyecto

    ? PWA es para instalar la web como una app
    npm install vite-plugin-pwa -D
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslint(),
        VitePWA({
            manifest: {
                icons: [
                    {
                        src: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ],
    server: {
        port: process.env.PORT || 3000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
