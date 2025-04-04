<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import { breakpointsTailwind } from '@vueuse/core'

const NavbarMenuTriggerButton = defineAsyncComponent(
  () => import('@/components/NavbarMenuTriggerButton.vue'),
)
const router = useRouter()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smallerOrEqual('md')

const showNavigationMenu = ref(isMobile.value ? false : true)
const orientation = computed(() => (isMobile.value ? 'vertical' : 'horizontal'))
const links: NavigationMenuItem[] = [
  {
    label: 'Trip Cost Calculator',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
]

const navigationMenuWrapperClass = computed(() => {
  if (!isMobile.value) return

  return 'absolute top-full left-0 w-full bg-(--ui-bg)/60 backdrop-blur-lg min-h-[80vh] z-10 py-5 px-5'
})

function resetMenuVisibility() {
  showNavigationMenu.value = true
}

router.beforeEach(() => {
  if (isMobile.value && showNavigationMenu.value) {
    showNavigationMenu.value = false
  }
})
</script>

<template>
  <div class="relative bg-(--ui-bg)">
    <UContainer class="flex justify-between items-center">
      <RouterLink to="/" class="block text-2xl py-2 md:py-4 md:text-3xl"> FuelMate </RouterLink>

      <NavbarMenuTriggerButton
        v-if="isMobile"
        v-model:show="showNavigationMenu"
        @vue:unmounted="resetMenuVisibility"
      />

      <div v-show="showNavigationMenu" :class="navigationMenuWrapperClass">
        <UNavigationMenu :items="links" variant="link" :orientation />
      </div>
    </UContainer>
  </div>
</template>
