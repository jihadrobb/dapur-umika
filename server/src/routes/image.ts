import { Router } from 'express'
import Controller from '../controllers/imageController'

const router = Router()

router.post('/add', Controller.addImage)
router.put('/:id', Controller.editImage)
router.delete('/:id', Controller.deleteImage)

export default router
