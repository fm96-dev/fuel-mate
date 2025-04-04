import type { FUEL_TYPES } from './constants'
import type { getGasStationByDistance } from './gasStation'

export type FuelType = (typeof FUEL_TYPES)[number]

export interface GetGasStationByDistanceOptions {
  /* The type of fuel to filter gas stations by. */
  fuelType: FuelType
  /**
   * The date for which the gas station data is requested, in ISO 8601 format.
   * @default - current date
   */
  date?: string
  /*  The latitude of the location to search from. */
  lat: number
  /**  The longitude of the location to search from. */
  lng: number
  /**
   * The maximum distance (in kilometers) from the specified location to search for gas stations.
   * @default '5'
   */
  distance?: string
}

export interface GasStationResponseDataItem {
  id: string
  name: string
  nameImpianto: string
  brand: string
  latitude: string
  longitude: string
  elevation: string
  address: string
  tipoStrada: string
  comune: string
  provincia: string
  regioneId: string
  startDate: string
  endDate: string
  timeStamp: string
  prezzo: string
  distance: string
}

export type GetGasStationByDistanceResponseData = GasStationResponseDataItem[]

export type GasStation = Awaited<ReturnType<typeof getGasStationByDistance>>
