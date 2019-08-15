import Fire from './Fire.svelte'
import { render } from '@testing-library/svelte'

describe('Fire', () => {
  it('renders', () => {
    // <Fire />
    expect(() => render(Fire)).not.toThrow()
  })
})