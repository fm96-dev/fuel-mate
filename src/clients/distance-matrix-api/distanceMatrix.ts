import { client } from './client'
import type { DistanceMatrixResponseData } from './types'

export async function getDistanceMatrix(origin: string, destination: string) {
  const data = await client<DistanceMatrixResponseData>('/distancematrix/json', {
    query: {
      key: import.meta.env.VITE_DISTANCE_MATRIX_API_KEY,
      origins: origin,
      destinations: destination,
    },
  })

  if (data.status !== 'OK') {
    throw new Error(
      data.error_message
        ? `[${data.status}]: ${data.error_message}`
        : 'An error occurred while fetching the distance matrix.',
    )
  }

  const [row] = data.rows
  return row.elements[0]
}
