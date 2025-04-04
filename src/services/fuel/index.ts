import type { FuelType } from '@/clients/open-carburanti'
import { getGasStationByDistance } from '@/clients/open-carburanti'

export async function getAverageFuelPrice(fuelType: FuelType, coords: GeolocationCoordinates) {
  const gasStations = await getGasStationByDistance({
    fuelType,
    lat: coords.latitude,
    lng: coords.longitude,
  })

  const averagePrice =
    gasStations.reduce((sum, { price }) => (sum += parseFloat(price)), 0) / gasStations.length

  return +averagePrice.toFixed(3)
}
