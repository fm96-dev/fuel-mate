import type { output } from 'zod'
import { FUEL_TYPES } from '@/clients/open-carburanti/constants'
import { enum as $enum, number, object, string } from 'zod'

const schema = object({
  startLocation: string()
    .min(5, { message: 'Start location must be at least 5 characters long' })
    .nonempty({ message: 'Start location is required' }),
  endLocation: string()
    .min(5, { message: 'End location must be at least 5 characters long' })
    .nonempty({ message: 'End location is required' }),
  fuelType: $enum(FUEL_TYPES, { message: 'Invalid fuel type selected' }),
  averageConsumption: number({ coerce: true }).positive({
    message: 'Average consumption must be a positive number',
  }),
  fuelPrice: number({ coerce: true }).positive({
    message: 'Fuel price must be a positive number',
  }),
})

export type TripCalculatorFormData = output<typeof schema>

export default schema
