import { Router } from 'express'
import Controller from '../controllers/productController'
import { ProductValidator } from '../middlewares/validators'
import jwtChecker from '../middlewares/jwtChecker'

const router = Router()

router.post('/', Controller.getProduct)
router.post(
  '/:id',
  ProductValidator.checkGetOneProduct(),
  Controller.getOneProduct
)
router.post(
  '/add',
  jwtChecker,
  ProductValidator.checkAddProduct(),
  Controller.addProduct
)
router.put(
  '/:id',
  jwtChecker,
  ProductValidator.checkEditProduct(),
  Controller.editProduct
)
router.delete(
  '/:id',
  jwtChecker,
  ProductValidator.checkDeleteProduct(),
  Controller.deleteProduct
)

export default router
