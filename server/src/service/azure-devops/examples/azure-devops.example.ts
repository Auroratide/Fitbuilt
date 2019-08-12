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

  it('returns the current pipeline', async () => {
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

  afterEach(() => (fetch as any).stubs.reset())
})