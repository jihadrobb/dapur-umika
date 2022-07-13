import { Model, DataTypes } from 'sequelize'
import db from '../config/database.config'

interface ImageAttributes {
  id: string
  url: string
  productId: string
}

export class Image extends Model<ImageAttributes> {}

Image.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    url: { type: DataTypes.STRING, allowNull: false },
    productId: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize: db, tableName: 'Images' }
)
