import { BadRequest } from '@/helpper'
import { hashPassword } from '@/middlewares/auth'
import { findAllUser, findUser } from '@/models/repository/user.repo'
import userModel from '@/models/user.model'
import { KeyValuePair } from '@/type/utils.type'
import { getUserInfo } from '@/utils'
import { Types } from 'mongoose'
import bcrypt from 'bcrypt'

class UserService {
  static async getUser(id: Types.ObjectId) {
    const getUser = await findUser({ _id: id }, '-password -createdAt -updatedAt')
    if (!getUser) throw new BadRequest('User not found')

    return {
      user: getUser
    }
  }

  static async getAllUser() {
    const AllUser = await findAllUser('-password -createdAt -updatedAt')
    const totalUsers = await userModel.countDocuments()
    if (!AllUser) throw new BadRequest('some thing error')
    return {
      user: AllUser,
      totalUsers
    }
  }
  static async updateUser(id: any, body: KeyValuePair<string | number>) {
    const getUser = await findUser({ _id: id })
    if (!getUser) throw new BadRequest('User not found')

    const query = { _id: id }
    const update = body
    const option = {
      new: true
    }
    const updateUser = await userModel.findOneAndUpdate(query, update, option)

    return 'user updated'
  }

  static async updatePassword(
    id: Types.ObjectId,
    { password, currentPassword, confirmPassword }: KeyValuePair<string>
  ) {
    const getUser = await userModel.findOne({ _id: id })
    if (!getUser) throw new BadRequest('User not found')

    if (!(await bcrypt.compare(password, currentPassword))) throw new BadRequest('Current password not matched')
    if (currentPassword !== confirmPassword) throw new BadRequest('Confirm password not matched')

    const hashPass = await hashPassword(password)
    console.log(getUser)
    const query = { _id: id }
    const update = {
      $set: { password: hashPass }
    }
    const option = {
      new: true
    }
    const setPassword = await userModel.findOneAndUpdate(query, update, option)

    return getUserInfo(setPassword)
  }
  static async deleteUser(id: string) {
    const del = await userModel.findOneAndDelete({ _id: id })
    if (!del) throw new BadRequest('delete failed')

    return {
      userDeleted: del
    }
  }
}

export default UserService
