import type { DistanceMatrixResponseData } from './types'
import { faker } from '@faker-js/faker'
import { getDistanceMatrix } from './index'

const { clientMock } = vi.hoisted(() => ({
  clientMock: vi.fn(),
}))

vi.mock('./client', () => ({
  client: clientMock,
}))

describe('getDistanceMatrix', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  function createDistanceMatrixResponseData(
    origin: string,
    destination: string,
  ): DistanceMatrixResponseData {
    return {
      status: 'OK',
      origin_addresses: [origin],
      destination_addresses: [destination],
      rows: [
        {
          elements: [
            {
              status: 'OK',
              origin,
              destination,
              distance: { text: '20 Km', value: 20000 },
              duration: { text: '15 mins', value: 900 },
            },
          ],
        },
      ],
    }
  }

  it('should return the distance matrix element when the API call is successful', async () => {
    const origin = faker.location.streetAddress()
    const destination = faker.location.streetAddress()
    const responseData = createDistanceMatrixResponseData(origin, destination)
    clientMock.mockResolvedValue(responseData)

    const result = await getDistanceMatrix(origin, destination)
    expect(clientMock).toHaveBeenCalledWith('/distancematrix/json', {
      query: {
        key: expect.any(String),
        origins: origin,
        destinations: destination,
      },
    })

    // @ts-expect-error rows is defined
    expect(result).toEqual(responseData.rows[0].elements[0])
  })

  it('should throw an error when the API response status is not OK', async () => {
    const mockResponse: DistanceMatrixResponseData = {
      status: 'REQUEST_DENIED',
      error_message: 'Invalid API key',
    }
    clientMock.mockResolvedValue(mockResponse)

    await expect(getDistanceMatrix('origin', 'destination')).rejects.toThrow(
      '[REQUEST_DENIED]: Invalid API key',
    )
  })

  it('should throw a generic error when no error message is provided', async () => {
    const mockResponse: DistanceMatrixResponseData = {
      status: 'UNKNOWN_ERROR',
    }
    clientMock.mockResolvedValue(mockResponse)

    await expect(getDistanceMatrix('origin', 'destination')).rejects.toThrow(
      'An error occurred while fetching the distance matrix.',
    )
  })
})
