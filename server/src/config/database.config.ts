import { Sequelize } from 'sequelize'

const db_url = process.env.DB_URL as string
const db_host = process.env.DB_HOST as string

const db = new Sequelize(db_url, {
  host: db_host,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

export default db
