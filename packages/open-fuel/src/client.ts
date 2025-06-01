import { createFetch } from 'ofetch'

export const client = createFetch({
  defaults: {
    baseURL: 'https://wafi.iit.cnr.it/lab/djst/opencarburanti/api',
  },
})
