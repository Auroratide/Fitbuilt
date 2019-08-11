import Pipeline from './Pipeline.svelte'
import { Passed, Failed } from '../Stage'
import { render, cleanup, waitForElement } from '@testing-library/svelte'
import fetch from 'fetch-mock'

describe('Pipeline', () => {

  let wrapper
  const waitForApi = () => waitForElement(() => wrapper.getByText('Pipeline'))
  const stage = name => wrapper.getByText(name)

  beforeEach(() => {
    fetch.get('/api/services/azure-devops/pipelines/1', {
      status: 200,
      body: {
        name: 'Pipeline',
        stages: [ {
          name: 'Passed Stage',
          status: Passed
        }, {
          name: 'Failed Stage',
          status: Failed
        } ]
      }
    })
  })

  it('displays stages from the pipelines API', async () => {
    // <Pipeline id="123" />
    wrapper = render(Pipeline, { props: {
      id: '1'
    }})
    await waitForApi()

    const passedStage = stage('Passed Stage')
    const failedStage = stage('Failed Stage')

    expect(passedStage).toBeInTheDocument()
    expect(failedStage).toBeInTheDocument()
  })

  afterEach(() => {
    fetch.restore()
    cleanup()
  })
})