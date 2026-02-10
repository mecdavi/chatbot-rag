import { Router } from 'express'
import { healthCheck } from './Controllers/health.controller.js'
import SearchEngineController from './Controllers/searchEngine.controller.js'
import { ask } from './Controllers/ask.controller.js'

const router = Router()

router.get('/health', healthCheck)
router.get('/search', SearchEngineController.search)
router.post('/add-document', SearchEngineController.addDocument)
router.post('/ask', ask)
export default router
