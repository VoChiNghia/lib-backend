import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { Model, Params } from '@/type/utils.type'
import mongoose from 'mongoose'
import { BadRequest } from '@/helpper'
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
}

const createModel = async (model: Model, body: object = {}): Promise<any> => {
  return await model.create(body)
}

const getInforData = ({ fields = [], object = {} }: Params): object => {
  return _.pick(object, fields)
}

const convertStringToObjectId = (id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(id)
}

function validateObjectId(id: string) {
  try {
    return mongoose.Types.ObjectId.isValid(id)
  } catch (error) {
    throw new BadRequest('wrong ObjectId')
  }
}
const getUserInfo = (user: any) => {
  const defaultFields = ['_id', 'name', 'email', 'phoneNumber', 'role']
  return getInforData({
    fields: defaultFields,
    object: user
  })
}

export { asyncHandler, createModel, getInforData, getUserInfo, convertStringToObjectId, validateObjectId }
