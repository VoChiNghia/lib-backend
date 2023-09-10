import { KeyValuePair } from '@/type/utils.type'
import userModel from '../user.model'
import { Types } from 'mongoose'

const findAllUser = async (select: string = '') => {
  return await userModel.find().lean().select(select)
}

const findUser = async (payload: KeyValuePair<any>, select: string = '') => {
  return await userModel.findById(payload).lean().select(select)
}



export { findAllUser, findUser }
