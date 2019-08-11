import { Router } from 'express'
import { ServiceAdapter } from '../service/ServiceAdapter'

export default function<T>(adapter: ServiceAdapter<T>) {
  const router = Router()

  router.get('/pipelines/:id', (req, res) => {
    adapter.currentStages(req.params.id, req.query).then(stages => {
      res.json({
        name: 'Unknown',
        stages
      })
    })
  })

  return router
}