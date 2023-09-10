import mongoose from 'mongoose'
import dbConfig from '../config/index'

const connectString = `${dbConfig.mongodb.host}${dbConfig.mongodb.name}:${dbConfig.mongodb.password}@cluster0.ke33mky.mongodb.net/`
class Database {
  private static instance: Database

  constructor() {
    this.connect()
  }

  connect() {
    mongoose
      .connect('mongodb+srv://nghiakg114321:nghiakg114321@cluster1.ezyaajy.mongodb.net/')
      .then(() => {
        console.log('database connected')
      })
      .catch((error) => console.log(error))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

export default Database
