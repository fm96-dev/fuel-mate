import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import autoimport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import router from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    autoimport({
      imports: ['vue', VueRouterAutoImports],
      dts: true,
      eslintrc: { enabled: true },
    }),
    router({
      dts: 'router.d.ts',
      routesFolder: 'src/views',
    }),
    vue(),
    components({
      collapseSamePrefixes: true,
      dts: true,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
