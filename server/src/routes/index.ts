import { Request, Response, Router } from 'express'
import userRoutes from './user'
import productRoutes from './product'
import imageRoutes from './image'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Dapur Umika is running' })
})
router.use('/', userRoutes)
router.use('/products', productRoutes)
router.use('/images', imageRoutes)

export default router
