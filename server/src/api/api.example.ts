import http from 'http'
import api from './index'
import server from '../server'
import pipelines from './pipelines'
import { ServiceAdapter } from '../service/ServiceAdapter'
import { Pipeline, Status } from '../Pipeline'
import fetch from 'node-fetch'

interface MockConfig {
  param: string
}

class MockAdapter implements ServiceAdapter<MockConfig> {
  public currentPipeline(id: string, config: MockConfig): Promise<Pipeline> {
    if(id === '1' && config.param === 'value') {
      return Promise.resolve({
        name: 'Pipeline',
        status: Status.Passed,
        stages: [ {
          name: 'Stage 1',
          status: Status.Passed
        } ]
      })
    } else {
      return Promise.reject()
    }
  }
}

describe('api', () => {
  let app: http.Server

  it('uses the service to return a pipeline', async () => {
    try {
      api.use('/services/mock-service', pipelines(new MockAdapter()))
      app = server.listen(3001)

      const result = await fetch('http://localhost:3001/api/services/mock-service/pipelines/1?param=value')
        .then(res => res.json())

      expect(result).toEqual({
        name: 'Pipeline',
        status: Status.Passed,
        stages: [ {
          name: 'Stage 1',
          status: Status.Passed
        } ]
      })
    } finally {
      app.close()
    }
  })
})