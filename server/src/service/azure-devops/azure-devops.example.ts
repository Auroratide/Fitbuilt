import { Adapter } from './Adapter'
import { Config } from './Config'
import { Status } from '../../Pipeline'
import { AzureDevops } from './AzureDevops'

import fetch from '../../fetch'
jest.mock('../../fetch')

describe('Azure Devops', () => {

  const config: Config = {
    url: 'https://terrace.visualstudio.com',
    collection: 'DefaultCollection',
    project: 'Project'
  }

  beforeEach(() => {
    (fetch as any)
      .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds?definitions=123&$top=1&api-version=5.1')
      .then.respond(200, {
        value: [ {
          id: 12000
        } ]
      });

    (fetch as any)
      .when.get('https://terrace.visualstudio.com/DefaultCollection/Project/_apis/build/builds/12000/timeline?api-version=5.1')
      .then.respond(200, {
        records: [ {
          type: 'Task',
          name: 'Functional Tests',
          state: 'completed',
          result: 'succeeded',
          order: 2
        }, {
          type: 'Task',
          name: 'Build',
          state: 'completed',
          result: 'succeeded',
          order: 1
        } ]
      })
  })

  it('returns the stages of the current build', async () => {
    const adapter = new Adapter(new AzureDevops)

    const stages = await adapter.currentStages('123', config)

    expect(stages).toEqual([ {
      name: 'Build',
      status: Status.Passed
    }, {
      name: 'Functional Tests',
      status: Status.Passed
    } ])
  })
})