<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<ButtonProps>()

const show = defineModel<boolean>('show', {
  default: false,
})

function toggle() {
  show.value = !show.value
}
</script>

<template>
  <UButton v-bind="props" @click="toggle">
    <UIcon v-show="!show" name="lucide:menu" data-testid="menu-icon" />
    <UIcon v-show="show" name="lucide:x" data-testid="close-icon" />
  </UButton>
</template>
