import type { GeocodingResult } from './types'
import type { Position } from '@capacitor/geolocation'

import { geocode } from 'opencage-api-client'

export async function getAddressFromCoords(coords: Position['coords']) {
  const { results } = await geocode({
    key: import.meta.env.VITE_OPENCAGEDATA_API_KEY,
    q: [coords.latitude, coords.longitude].join(','),
    countrycode: 'it',
    language: 'it',
  })

  const { geometry, formatted, components, distance_from_q } = results[0] as GeocodingResult

  return {
    geometry,
    formatted,
    components,
    distance_from_q,
  }
}

export async function getCoordsFromAddress(address: string) {
  const { results } = await geocode({
    key: import.meta.env.VITE_OPENCAGEDATA_API_KEY,
    q: address,
    countrycode: 'it',
    language: 'it',
  })

  const { geometry, formatted, components, distance_from_q } = results[0] as GeocodingResult

  return {
    geometry,
    formatted,
    components,
    distance_from_q,
  }
}
