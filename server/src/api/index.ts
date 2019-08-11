import { Router } from 'express'
import pipelines from './pipelines'

const router = Router()

router.use('/services/azure-devops', pipelines())

export default router