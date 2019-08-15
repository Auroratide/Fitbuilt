import {
  Passed,
  Failed,
  InProgress,
  Pending
} from '../../Stage'
import fetch from 'fetch-mock'

const url = () => '/api/services/azure-devops/pipelines/1'

export const pipelineIsBuilding = () => {
  fetch.get(url(), {
    status: 200,
    body: {
      name: 'Pipeline',
      status: InProgress,
      stages: [ {
        name: 'Passed Stage',
        status: Passed
      }, {
        name: 'In-progress Stage',
        status: InProgress
      }, {
        name: 'Pending Stage',
        status: Pending
      } ]
    }
  })
}

export const buildFailed = () => {
  fetch.get(url(), {
    status: 200,
    body: {
      name: 'Pipeline',
      status: Failed,
      stages: [ {
        name: 'Passed Stage',
        status: Passed
      }, {
        name: 'Failed Stage',
        status: Failed
      } ]
    }
  })
}

export const buildPassed = () => {
  fetch.get(url(), {
    status: 200,
    body: {
      name: 'Pipeline',
      status: Passed,
      stages: [ {
        name: 'Passed Stage',
        status: Passed
      } ]
    }
  })
}