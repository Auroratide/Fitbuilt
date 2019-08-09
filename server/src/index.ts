import * as path from 'path'
import express from 'express'
import { Status } from './Pipeline'

const app = express()
const port = 3000

app.get('/api/services/azure-devops/pipelines/123', (req, res) => {
  res.json({
    name: 'Pipeline',
    status: Status.InProgress,
    stages: [ {
      name: 'First',
      status: Status.Passed
    }, {
      name: 'Second',
      status: Status.Passed
    }, {
      name: 'Third',
      status: Status.InProgress
    }, {
      name: 'Fourth',
      status: Status.Pending
    } ]
  })
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log('Server is started...')
})