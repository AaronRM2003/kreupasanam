import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command, mode }) => {
  return {
    base: '/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Kreupasanam Testimonies',
          short_name: 'Kreupa Voice',
          description: 'Explore Kreupasanam Marian Shrine content in multiple languages.',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '/assets/kreupa-192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/assets/kreupa.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/assets/kreupa-180.png',
              sizes: '180x180',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
           navigateFallback: null,
          runtimeCaching: [
            {
              // Always bypass React for static assets
              urlPattern: ({ url }) => url.pathname.startsWith('/assets/'),
              handler: 'NetworkOnly'
            },
            {
              // Always bypass React for SEO files
              urlPattern: ({ url }) =>
                url.pathname.endsWith('sitemap.xml') ||
                url.pathname.endsWith('robots.txt'),
              handler: 'NetworkOnly'
            }
          ]
        }
      })
    ],
    server: {
      host: true,
      port: 5173
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      }
    }
  };
});
