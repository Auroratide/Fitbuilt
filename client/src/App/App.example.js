import App from './App.svelte'
import { render } from '@testing-library/svelte'

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(App)).not.toThrow()
  })
})