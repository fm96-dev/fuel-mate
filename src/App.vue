<template>
  <UseScreenSafeArea top right bottom left>
    <UApp>
      <Navbar />
      <RouterView />
    </UApp>
  </UseScreenSafeArea>
</template>

<style lang="postcss">
#app {
  padding-top: var(--vueuse-safe-area-top);
  padding-left: var(--vueuse-safe-area-left);
  padding-right: var(--vueuse-safe-area-right);
  padding-bottom: var(--vueuse-safe-area-bottom);
}
</style>
