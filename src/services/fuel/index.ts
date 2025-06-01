import type { FuelType } from '@open-fuel/client'
import type { Position } from '@capacitor/geolocation'
import { getGasStationByDistance } from '@open-fuel/client'

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
