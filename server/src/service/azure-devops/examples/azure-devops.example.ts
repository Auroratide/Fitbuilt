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

  it('indicates stages that failed', async () => {
    scenarios.buildFailed()

    const pipeline = await adapter.currentPipeline('123', config)

    expect(pipeline).toEqual({
      name: 'Pipeline Name',
      status: Status.Failed,
      stages: [ {
        name: 'Build',
        status: Status.Failed
      } ]
    })
  })

  it('sorts tasks appropriately by their stage', async () => {
    scenarios.buildWithStages()

    const pipeline = await adapter.currentPipeline('123', config)

    expect(pipeline).toEqual({
      name: 'Pipeline Name',
      status: Status.Passed,
      stages: [ {
        name: 'Task 1-1-1',
        status: Status.Passed
      }, {
        name: 'Task 1-1-2',
        status: Status.Passed
      }, {
        name: 'Task 1-2-1',
        status: Status.Passed
      }, {
        name: 'Task 2-1-1',
        status: Status.Passed
      }, {
        name: 'Task 2-1-2',
        status: Status.Passed
      }, {
        name: 'Task 2-2-1',
        status: Status.Passed
      } ]
    })
  })

  afterEach(() => (fetch as any).stubs.reset())
})