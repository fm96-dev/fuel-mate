/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly VITE_DISTANCE_MATRIX_BASE_URL: string
  readonly VITE_DISTANCE_MATRIX_API_KEY: string
  readonly VITE_OPENCAGEDATA_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
