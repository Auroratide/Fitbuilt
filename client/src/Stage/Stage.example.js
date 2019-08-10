import Stage from './Stage.svelte'
import { Passed } from './status'
import { render } from '@testing-library/svelte'

describe('Stage', () => {
  it('renders', () => {
    // <Stage name="Hello" status={Passed} />
    expect(() => render(Stage, { props: {
      name: 'Hello',
      status: Passed
    }})).not.toThrow()
  })
})