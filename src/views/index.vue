<script setup lang="ts">
import type { TripCalculatorFormData } from '@/validations/tripCalculatorFormValidation'
import type { ResultItem } from '@/components/TripResultsRenderer.vue'
import { formatFromMs } from '@/utils/time'
import { getDistanceMatrix } from '@/clients/distance-matrix-api'
import { useAsyncFn } from '@/composables/useAsyncFn'

const toast = useToast()

const tripResults = useTemplateRef('trip-results')
const results = ref<ResultItem[]>([])

const { loading, run: onSubmit } = useAsyncFn(async (data: TripCalculatorFormData) => {
  const { distance, duration } = await getDistanceMatrix(data.startLocation, data.endLocation)
  const distanceKm = distance.value / 1000

  const fuelLiters = distanceKm / data.averageConsumption
  const tripCost = (data.fuelPrice * fuelLiters).toFixed(2)

  results.value = [
    { label: 'cost', value: `${tripCost} €` },
    { label: 'distance', value: `${distance.text}` },
    { label: 'liters', value: `${fuelLiters.toFixed(2)} l` },
    { label: 'time', value: formatFromMs(duration.value * 1000, 'HH:mm') },
  ]

  await nextTick()
  tripResults.value!.scrollIntoView({ behavior: 'smooth' })
})

function onError(error: unknown) {
  if (error instanceof GeolocationPositionError) {
    toast.add({
      color: 'error',
      title: 'Unable to get current position',
      description: error.message,
    })
  }
}
</script>

<template>
  <div class="py-5">
    <section class="py-6">
      <UContainer>
        <h1 class="text-4xl font-semibold text-center mb-12">Trip Cost Calculator</h1>
        <div class="text-sm text-center mb-6">
          Please fill out the form below with your trip details.<br />
          The starting location can be detected by clicking on the button on the right.<br />
          The fuel price will be automatically calculated based on the starting location within a
          radius of 5 km.
        </div>

        <TripCalculatorForm :loading @submit="onSubmit" @error="onError" />
      </UContainer>
    </section>

    <section ref="trip-results" class="py-6" v-if="results.length">
      <UContainer>
        <h2 class="text-2xl font-semibold text-center">Results</h2>

        <TripResultsRenderer :results />
      </UContainer>
    </section>
  </div>
</template>
