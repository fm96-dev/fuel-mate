<script lang="ts" setup>
export interface ResultItem {
  label: string
  value: string
}

interface Props {
  results: ResultItem[]
}
const { results } = defineProps<Props>()
</script>

<template>
  <div class="grid gap-4 grid-cols-2 mt-6">
    <UCard v-for="{ label, value } of results" :key="label" class="text-center">
      <div class="text-3xl mt-4 mb-3">{{ value }}</div>
      <div class="font-semibold text-sm uppercase">{{ label }}</div>
    </UCard>
  </div>
</template>
