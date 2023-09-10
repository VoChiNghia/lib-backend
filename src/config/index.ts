import dotenv from 'dotenv'
dotenv.config()

const configDatabase = {
  mongodb: {
    name: process.env.NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST
  }
}

export default configDatabase
