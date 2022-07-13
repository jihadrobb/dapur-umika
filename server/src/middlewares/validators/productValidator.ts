import { body, param, CustomValidator } from 'express-validator'
import { Product } from '../../models'

export default class ProductValidator {
  static checkAddProduct() {
    return [
      body('name').notEmpty().withMessage('Product name should not be empty'),
      body('description')
        .notEmpty()
        .withMessage('Product description should not be empty'),
      body('price').notEmpty().withMessage('Product price should not be empty')
    ]
  }

  static checkGetOneProduct() {
    return [param('id').custom(checkValidProductId)]
  }

  static checkEditProduct() {
    return [param('id').custom(checkValidProductId)]
  }

  static checkDeleteProduct() {
    return [param('id').custom(checkValidProductId)]
  }
}

const checkValidProductId: CustomValidator = (value) => {
  return Product.findOne({ where: { id: value } }).then((prod) => {
    console.log('prod', prod)
    if (!prod) {
      return Promise.reject('Product not found')
    }
  })
}
