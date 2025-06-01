import type { GasStationResponseDataItem } from './types'

export function parseGasStation(input: GasStationResponseDataItem) {
  return {
    id: input.id,
    name: input.name,
    stationName: input.nameImpianto,
    brand: input.brand,
    latitude: input.latitude,
    longitude: input.longitude,
    elevation: input.elevation,
    address: input.address,
    roadType: input.tipoStrada,
    municipality: input.comune,
    province: input.provincia,
    regionId: input.regioneId,
    startDate: input.startDate,
    endDate: input.endDate,
    timeStamp: input.timeStamp,
    price: input.prezzo,
    distance: input.distance,
  }
}
