import compression from 'compression'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import { HttpCode } from './utils/httpCode'
import { AppError, NotFoundError, SusscessResponse } from './helpper'
import Database from './database/db.init'
import logger from './logs'
import router from './router'
dotenv.config()
new Database()

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.router()
  }
  private config() {
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(compression())
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use('/public', express.static('public'))
    this.app.use(express.json({ limit: '50mbb' }))
  }

  private router() {
    this.app.use('/', router)

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const err = new NotFoundError('Not found')
      logger.error('Not found')
      next(err)
    })
    this.app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
      const error = err.httpCode ? err.httpCode : HttpCode.INTERNAL_SERVER_ERROR
      return new SusscessResponse({
        message: err.message,
        httpCode: error
      }).send(res)
    })
  }
}

export default new App().app