import Footprints from './Footprints.svelte'
import { render } from '@testing-library/svelte'

describe('Footprints', () => {
  it('renders', () => {
    // <Footprints />
    expect(() => render(Footprints)).not.toThrow()
  })
})