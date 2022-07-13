import { Model, DataTypes } from 'sequelize'
import db from '../config/database.config'

interface ProductAttributes {
  id: string
  name: string
  description: string
  price: number
}

export class Product extends Model<ProductAttributes> {}

Product.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize: db, tableName: 'Products' }
)
