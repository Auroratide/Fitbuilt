import { Router } from 'express'
import { ServiceAdapter } from '../service/ServiceAdapter'

export default function<T>(adapter: ServiceAdapter<T>) {
  const router = Router()

  router.get('/pipelines/:id', (req, res) => {
    adapter.currentPipeline(req.params.id, req.query)
      .then(pipeline => res.json(pipeline))
  })

  return router
}