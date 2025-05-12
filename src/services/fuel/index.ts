import type { FuelType } from '@/clients/open-carburanti'
import type { Position } from '@capacitor/geolocation'
import { getGasStationByDistance } from '@/clients/open-carburanti'

export async function getAverageFuelPrice(fuelType: FuelType, coords: Position['coords']) {
  const gasStations = await getGasStationByDistance({
    fuelType,
    lat: coords.latitude,
    lng: coords.longitude,
  })

  const averagePrice =
    gasStations.reduce((sum, { price }) => (sum += parseFloat(price)), 0) / gasStations.length

  return +averagePrice.toFixed(3)
}
