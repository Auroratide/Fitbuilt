import { Router } from 'express'
import pipelines from './pipelines'
import AzureDevops from '../service/azure-devops'
import StubService from '../service/stub-service'

const router = Router()

router.use('/services/azure-devops', pipelines(AzureDevops))
router.use('/services/stub-service', pipelines(StubService))

export default router