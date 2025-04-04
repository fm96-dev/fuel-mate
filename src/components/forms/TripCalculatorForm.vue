<script lang="ts" setup>
import type { FormSubmitEvent, SelectItem } from '@nuxt/ui'
import type { TripCalculatorFormData } from '@/validations/tripCalculatorFormValidation'
import { FUEL_TYPES } from '@/clients/open-carburanti/constants'
import schema from '@/validations/tripCalculatorFormValidation'
import { useAsyncFn } from '@/composables/useAsyncFn'
import { getCurrentPosition } from '@/utils/geolocation'
import { getAddressFromCoords, getCoordsFromAddress } from '@/services/geocoding'
import { getAverageFuelPrice } from '@/services/fuel'

interface Props {
  loading?: boolean
}
const { loading = false } = defineProps<Props>()

interface Emits {
  (e: 'submit', data: TripCalculatorFormData): void
  (e: 'error', error: unknown): void
}
const emit = defineEmits<Emits>()

const fuelTypeOptions: SelectItem[] = FUEL_TYPES.map((value) => ({ label: value, value }))

const userCurrentPositionCoords = shallowRef<GeolocationCoordinates>()
const isStartLocationSetByUserPosition = ref(false)

const state = reactive<TripCalculatorFormData>({
  fuelType: 'Benzina',
  startLocation: '',
  endLocation: '',
  averageConsumption: 20,
  fuelPrice: 1.779,
})

const { loading: loadingUserPosition, run: loadUserPosition } = useAsyncFn(async function () {
  try {
    const { coords } = await getCurrentPosition({ enableHighAccuracy: true })
    userCurrentPositionCoords.value = coords
  } catch (error) {
    console.error(error)
    emit('error', error)
  }
})

async function setStartLocationFromCoords(coords: GeolocationCoordinates) {
  try {
    const { formatted } = await getAddressFromCoords(coords)
    state.startLocation = formatted
  } catch (error) {
    console.error(error)
    emit('error', error)
  }
}

/** Set automatically the state.startLocation by user's current position */
watch(userCurrentPositionCoords, async (coords) => {
  if (coords) {
    await setStartLocationFromCoords(coords)
    isStartLocationSetByUserPosition.value = true
  }
})

const { loading: loadingAverageFuelPrice, run: loadAverageFuelPrice } = useAsyncFn(
  async function () {
    let coords: GeolocationCoordinates
    if (isStartLocationSetByUserPosition.value && userCurrentPositionCoords.value) {
      coords = userCurrentPositionCoords.value
    } else {
      const result = await getCoordsFromAddress(state.startLocation)
      coords = {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
      } as unknown as GeolocationCoordinates
    }

    state.fuelPrice = await getAverageFuelPrice(state.fuelType, coords)
  },
)

watch(() => [state.startLocation, state.fuelType], loadAverageFuelPrice)

function resetStartLocationIfUserPositionChanged() {
  if (!loadingUserPosition.value && isStartLocationSetByUserPosition.value) {
    isStartLocationSetByUserPosition.value = false
    userCurrentPositionCoords.value = undefined
  }
}

function onSubmit(event: FormSubmitEvent<TripCalculatorFormData>) {
  emit('submit', event.data)
}
</script>

<template>
  <UForm :state :schema @submit="onSubmit">
    <div class="md:flex gap-4">
      <UFormField class="flex-1" name="startLocation" label="Start Location">
        <UInput
          :ui="{ trailing: 'pe-0' }"
          :loading="loadingUserPosition"
          :disabled="loadingUserPosition"
          v-model.lazy="state.startLocation"
          @change="resetStartLocationIfUserPositionChanged"
        >
          <template #trailing>
            <UButton
              icon="lucide:map-pinned"
              title="Use my position"
              variant="subtle"
              @click="loadUserPosition"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField class="flex-1" name="endLocation" label="End Location">
        <UInput v-model="state.endLocation" />
      </UFormField>
    </div>

    <div class="flex max-md:flex-col md:gap-4">
      <UFormField class="flex-1" name="fuelType" label="Fuel Type">
        <USelect :items="fuelTypeOptions" v-model="state.fuelType" />
      </UFormField>

      <UFormField class="flex-1" name="averageConsumption" label="Average Consumption">
        <UInput type="number" v-model.number="state.averageConsumption">
          <template #trailing>
            <span class="inline-block text-sm pl-2 border-l border-(--ui-border-accented)">
              Km/l
            </span>
          </template>
        </UInput>
      </UFormField>

      <UFormField class="flex-1" name="fuelPrice" label="Average Fuel Cost">
        <UInput
          type="number"
          :loading="loadingAverageFuelPrice"
          :disabled="loadingAverageFuelPrice"
          v-model.number="state.fuelPrice"
        >
          <template #trailing>
            <span class="inline-block text-sm pl-2 border-l border-(--ui-border-accented)">
              €/l
            </span>
          </template>
        </UInput>
      </UFormField>
    </div>

    <UButton type="submit" class="mt-2" :loading block label="Calculate Trip Cost" />
  </UForm>
</template>
