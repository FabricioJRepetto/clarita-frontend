/*
    ? instalar dependencias para eslint:
        npm install eslint eslint-config-react-app vite-plugin-eslint --save-dev
    ? pegar archivo .eslintrc.json en el root del proyecto
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    server: {
        port: process.env.PORT || 3000
    }
})
