/*
    ? instalar dependencias para eslint:
        npm install eslint eslint-config-react-app vite-plugin-eslint --save-dev
    ? pegar archivo .eslintrc.json en el root del proyecto

    ? PWA es para instalar la web como una app
    npm install vite-plugin-pwa
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint(), VitePWA({ registerType: 'autoUpdate' })],
    server: {
        port: process.env.PORT || 3000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
