import { Model, DataTypes } from 'sequelize'
import db from '../config/database.config'

interface UserAttributes {
  id: string
  username: string
  password: string
  refreshToken: string
  isAdmin: boolean
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    refreshToken: { type: DataTypes.STRING },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  { sequelize: db, tableName: 'Users' }
)
