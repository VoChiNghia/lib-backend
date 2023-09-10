import { HttpCode } from '@/utils/httpCode'
import { ReasonPhrases } from '@/utils/reasonError'
import { Response } from 'express'
export class AppError extends Error {
  public readonly errorType: string

  public readonly httpCode: HttpCode

  public readonly isOperational: boolean

  constructor(message: string, httpCode: HttpCode, errorType: string) {
    super(message)
    this.httpCode = httpCode
    this.errorType = errorType
    this.isOperational = true
  }
}

export class SusscessResponse {
  httpCode: number
  message: string
  metadata: any

  constructor({ message = '', httpCode = HttpCode.OK, errorType = '', metadata = {} }) {
    this.httpCode = httpCode
    this.message = message
    this.metadata = metadata
  }

  send(res: Response, headers = {}) {
    return res.status(this.httpCode || HttpCode.OK).json(this)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, httpCode = 404, errorType = ReasonPhrases.NOT_FOUND) {
    super(message, httpCode, errorType)
  }
}

export class BadRequest extends AppError {
  constructor(message: string, httpCode = HttpCode.BAD_REQUEST, errorType = ReasonPhrases.BAD_REQUEST) {
    super(message, httpCode, errorType)
  }
}

export class Forbidden extends AppError {
  constructor(message: string, httpCode = HttpCode.FORBIDDEN, errorType = ReasonPhrases.FORBIDDEN) {
    super(message, httpCode, errorType)
  }
}
