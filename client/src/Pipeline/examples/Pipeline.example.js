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

  it('displays fire when the pipeline is red', async () => {
    scenarios.buildFailed()

    wrapper = render(Pipeline, { props: {
      id: '1'
    }})
    await waitForApi()

    const fire = icon('Fire')
    expect(fire).toBeInTheDocument()
  })

  it('refreshes every so often to show the most current status of the build', async () => {
    scenarios.inProgressThenPassed()

    wrapper = render(Pipeline, { props: {
      id: '1',
      interval: 50
    }})
    await waitForApi()

    const inProgressStage = stage('In Progress Stage')
    expect(inProgressStage).toBeInTheDocument()

    const passedStage = await waitForElement(() => stage('Passed Stage'))
    expect(passedStage).toBeInTheDocument()
  })

  afterEach(() => {
    fetch.restore()
    cleanup()
  })
})