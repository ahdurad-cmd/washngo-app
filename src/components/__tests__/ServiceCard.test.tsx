import { render } from '@testing-library/react'
import ServiceCard from '../ServiceCard'

describe('ServiceCard', () => {
  it('renders title and description', () => {
    const { getByText } = render(<ServiceCard title="Test Service" desc="Beskrivelse" price="100 kr" />)
    expect(getByText('Test Service')).toBeTruthy()
    expect(getByText('Beskrivelse')).toBeTruthy()
    expect(getByText('100 kr')).toBeTruthy()
  })
})
