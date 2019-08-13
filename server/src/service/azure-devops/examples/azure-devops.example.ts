import adapter from '..'

import { Status } from '../../../Pipeline'
import * as scenarios from './scenarios'
import fetch from '../../../fetch'
jest.mock('../../../fetch')

describe('Azure Devops', () => {
  const config = {
    url: 'https://terrace.visualstudio.com',
    collection: 'DefaultCollection',
    project: 'Project'
  }

  it('returns a successful pipeline', async () => {
    scenarios.allBuildsPassed()

    const pipeline = await adapter.currentPipeline('123', config)

    expect(pipeline).toEqual({
      name: 'Pipeline Name',
      status: Status.Passed,
      stages: [ {
        name: 'Build',
        status: Status.Passed
      }, {
        name: 'Functional Tests',
        status: Status.Passed
      } ]
    })
  })

  it('filters out non-task and azure-specific stages', async () => {
    scenarios.withExtraneousStages()

    const pipeline = await adapter.currentPipeline('123', config)

    expect(pipeline).toEqual({
      name: 'Pipeline Name',
      status: Status.Passed,
      stages: [ {
        name: 'Build',
        status: Status.Passed
      } ]
    })
  })

  it('indicates stages that are in progress', async () => {
    scenarios.buildIsInProgress()

    const pipeline = await adapter.currentPipeline('123', config)

    expect(pipeline).toEqual({
      name: 'Pipeline Name',
      status: Status.InProgress,
      stages: [ {
        name: 'Build',
        status: Status.Passed
      }, {
        name: 'Functional Tests',
        status: Status.InProgress
      }, {
        name: 'Contract Tests',
        status: Status.Pending
      } ]
    })
  })

  afterEach(() => (fetch as any).stubs.reset())
})