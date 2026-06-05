import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/move-a-bit/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '動一下',
        short_name: '動一下',
        description: '每天只要動一下，就夠了',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FBF7EF',
        theme_color: '#D89A72',
        start_url: '/move-a-bit/',
        scope: '/move-a-bit/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
