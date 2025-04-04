import type { GetGasStationByDistanceOptions, GetGasStationByDistanceResponseData } from './types'
import { client } from './client'
import { format } from 'date-fns'
import { parseGasStation } from './parsers'

export async function getGasStationByDistance(options: GetGasStationByDistanceOptions) {
  const data = await client<GetGasStationByDistanceResponseData>('/getDistributoriByDistance.php', {
    query: {
      carburante: options.fuelType,
      data: options.date ?? format(new Date(), 'yyyy-MM-dd'),
      cLat: options.lat,
      cLng: options.lng,
      distance: options.distance ?? '5',
    },
  })

  return data.map(parseGasStation)
}
