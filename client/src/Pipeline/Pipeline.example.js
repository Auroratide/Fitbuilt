import Pipeline from './Pipeline.svelte'
import { render } from '@testing-library/svelte'

describe('Pipeline', () => {
  it('renders', () => {
    // <Pipeline />
    expect(() => render(Pipeline)).not.toThrow()
  })
})