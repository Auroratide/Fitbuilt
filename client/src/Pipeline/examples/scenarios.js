import {
  Passed,
  Failed,
  InProgress,
  Pending
} from '../Stage'
import fetch from 'fetch-mock'

const url = () => '/api/services/my-service/pipelines/1'

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

export const inProgressThenPassed = () => {
  fetch.once(url(), {
    status: 200,
    body: {
      name: 'Pipeline',
      status: InProgress,
      stages: [ {
        name: 'In Progress Stage',
        status: InProgress
      } ]
    }
  }).get(url(), {
    status: 200,
    body: {
      name: 'Pipeline',
      status: Passed,
      stages: [ {
        name: 'Passed Stage',
        status: Passed
      } ]
    }
  }, {
    overwriteRoutes: false
  })
}

export const requiresAdditionalParams = () => {
  fetch.get(url() + '?fruit=apple&vegetable=tomato', {
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