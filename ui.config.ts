import { NuxtUIOptions } from '@nuxt/ui/unplugin'

const config: NuxtUIOptions['ui'] = {
  formField: {
    slots: {
      root: 'mb-3',
      container: 'mt-2',
    },
  },

  input: {
    slots: {
      root: 'flex',
    },
  },

  select: {
    slots: {
      base: 'w-full',
    },
  },
}

export default config
