import { Status } from '../Pipeline'
import { Router } from 'express'

const router = Router()

router.get('/services/azure-devops/pipelines/:id', (req, res) => {
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

export default router