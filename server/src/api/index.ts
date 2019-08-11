import { Router } from 'express'
import pipelines from './pipelines'
import AzureDevops from '../service/azure-devops'

const router = Router()

router.use('/services/azure-devops', pipelines(AzureDevops))

export default router