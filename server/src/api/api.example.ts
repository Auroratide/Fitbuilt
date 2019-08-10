import http from 'http'
import server from '../server'
import fetch from 'node-fetch'

describe('api', () => {
  let app: http.Server

  beforeAll(() => app = server.listen(3001))

  it('works', () => {
    return fetch('http://localhost:3001/api/services/azure-devops/pipelines/123')
      .then(res => res.json())
      .then(res => {
        expect(res.name).toEqual('Pipeline')
      })
  })

  afterAll(() => app.close())
})