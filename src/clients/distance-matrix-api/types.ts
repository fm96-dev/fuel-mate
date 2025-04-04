type Status =
  | 'OK'
  | 'ZERO_RESULTS'
  | 'OVER_DAILY_LIMIT'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'INVALID_REQUEST'
  | 'UNKNOWN_ERROR'

type ResponseData<Data extends object> =
  | (Data & { status: Extract<Status, 'OK'> })
  | { status: Exclude<Status, 'OK'>; error_message: string }

interface DistanceMatrixElement {
  /**
   * The distance information between the origin and destination.
   * Includes a human-readable text representation (e.g., "5 km") and
   * the exact value in meters.
   */
  distance: {
    /**
     * A human-readable representation of the distance (e.g., "5 km").
     */
    text: string
    /**
     * The distance value in meters.
     */
    value: number
  }

  /**
   * The duration information for traveling between the origin and destination.
   * Includes a human-readable text representation (e.g., "10 mins") and
   * the exact value in seconds.
   */
  duration: {
    /**
     * A human-readable representation of the duration (e.g., "10 mins").
     */
    text: string
    /**
     * The duration value in seconds.
     */
    value: number
  }

  /**
   * The starting point of the route for this element.
   */
  origin: string

  /**
   * The endpoint of the route for this element.
   */
  destination: string

  status: string
}
export type DistanceMatrixResponseData = ResponseData<{
  destination_addresses: string[]
  origin_addresses: string[]
  rows: Array<{
    elements: DistanceMatrixElement[]
  }>
}>
