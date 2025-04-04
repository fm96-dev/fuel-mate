import { createFetch } from 'ofetch'

export const client = createFetch({
  defaults: {
    baseURL: import.meta.env.VITE_DISTANCE_MATRIX_BASE_URL,
  },
})
