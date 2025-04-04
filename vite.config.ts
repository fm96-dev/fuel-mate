import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import router from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import vueDevTools from 'vite-plugin-vue-devtools'
import ssl from '@vitejs/plugin-basic-ssl'
import ui from '@nuxt/ui/vite'
import uiConfig from './ui.config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ssl({
      name: 'dev',
      domains: ['localhost', '*.local'],
    }),
    router({
      dts: 'router.d.ts',
      routesFolder: 'src/views',
    }),
    vue(),
    ui({
      ui: uiConfig,
      autoImport: {
        imports: ['vue', VueRouterAutoImports, '@vueuse/core'],
        dts: true,
        eslintrc: { enabled: true },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: './cordova/www',
  },
})
