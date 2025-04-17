import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import TripResultsRenderer from './TripResultsRenderer.vue'

describe('TripResultsRenderer', () => {
  const results = [
    { label: 'cost', value: '10.50 €/km' },
    { label: 'distance', value: '100 km' },
    { label: 'liters', value: '1.5 l' },
    { label: 'time', value: '00:30' },
  ]

  it('renders correctly with results', () => {
    render(TripResultsRenderer, {
      props: { results },
    })

    const cards = screen.getAllByTestId('result-card')
    expect(cards).toHaveLength(4)

    results.forEach(({ label, value }) => {
      expect(screen.getByText(label)).toBeVisible()
      expect(screen.getByText(value)).toBeVisible()
    })
  })
})
