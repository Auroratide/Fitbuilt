import Pipeline from '..'
import * as scenarios from './scenarios'
import { render, cleanup, waitForElement } from '@testing-library/svelte'
import fetch from 'fetch-mock'

describe('Pipeline', () => {

  let wrapper
  const waitForApi = () => waitForElement(() => wrapper.getByText('Pipeline'))
  const icon = name => wrapper.getByTitle(name)
  const stage = name => wrapper.getByText(name)

  it('displays stages from the pipelines API', async () => {
    scenarios.buildFailed()

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

  it('displays a heart when the pipeline is green', async () => {
    scenarios.buildPassed()

    wrapper = render(Pipeline, { props: {
      id: '1'
    }})
    await waitForApi()

    const heart = icon('Heart')
    expect(heart).toBeInTheDocument()
  })

  it('displays footprints when the pipeline is building', async () => {
    scenarios.pipelineIsBuilding()

    wrapper = render(Pipeline, { props: {
      id: '1'
    }})
    await waitForApi()

    const footprints = icon('Footprints')
    expect(footprints).toBeInTheDocument()
  })

  afterEach(() => {
    fetch.restore()
    cleanup()
  })
})