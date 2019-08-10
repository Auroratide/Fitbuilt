import Pipeline from './Pipeline.svelte'
import { render, cleanup, waitForElement } from '@testing-library/svelte'
import fetch from 'fetch-mock'

describe('Pipeline', () => {

  beforeEach(() => {
    fetch.get('/api/services/azure-devops/pipelines/123', {
      status: 200,
      body: {
        name: 'Pipeline',
        stages: [ {
          name: 'Stage',
          status: 'passed'
        } ]
      }
    })
  })

  it('renders', () => {
    // <Pipeline />
    expect(() => render(Pipeline)).not.toThrow()
  })

  it('displays stages from the pipelines API', async () => {
    const wrapper = render(Pipeline)
    const title = await waitForElement(() => wrapper.getByText('Pipeline'))

    expect(title).toBeInTheDocument()
  })

  afterEach(() => {
    fetch.restore()
    cleanup()
  })
})