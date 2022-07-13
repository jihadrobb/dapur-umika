import { User } from './user'
import { Product } from './product'
import { Image } from './image'

Product.hasMany(Image, {
  sourceKey: 'id',
  foreignKey: 'productId'
})

Image.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'Product'
})

export { User, Product, Image }
