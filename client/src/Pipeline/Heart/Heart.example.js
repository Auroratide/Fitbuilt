import Heart from './Heart.svelte'
import { render } from '@testing-library/svelte'

describe('Heart', () => {
  it('renders', () => {
    // <Heart />
    expect(() => render(Heart)).not.toThrow()
  })
})