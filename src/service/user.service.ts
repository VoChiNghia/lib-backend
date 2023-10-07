import { BadRequest } from '@/helpper'
import { hashPassword } from '@/middlewares/auth'
import { findAllUser, findUser } from '@/models/repository/user.repo'
import userModel from '@/models/user.model'
import { KeyValuePair } from '@/type/utils.type'
import { getUserInfo, validateObjectId } from '@/utils'
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
    const AllUser = await findAllUser('-password')
    const totalUsers = await userModel.countDocuments()
    if (!AllUser) throw new BadRequest('some thing error')
    return {
      user: AllUser,
      totalUsers
    }
  }
  static async updateUser(id: any, body: KeyValuePair<string | number>) {
    if (!validateObjectId(id)) {
      const hashPass: any = await hashPassword('12345678')
      await userModel.create({
        ...body,
        password: hashPass
      })
      return 'user created'
    }else{
      const getUser = await findUser({ _id: id })
      if(!getUser) throw new Error("Không tìm thấy người dùng")
      const query = { _id: id }
      const update = body
      const option = {
        new: true
      }
      const updateUser = await userModel.findOneAndUpdate(query, update, option)
  
      return 'user updated'
    }

    
  }

  static async updatePassword(
    id: Types.ObjectId,
    { password, currentPassword, confirmPassword }: KeyValuePair<string>
  ) {
    const getUser = await userModel.findOne({ _id: id })
    if (!getUser) throw new BadRequest('User not found')

    if (!(await bcrypt.compare(currentPassword, getUser.password))) throw new BadRequest('Mật khẩu hiện tại không đúng')
    if (String(password) !== String(confirmPassword)) throw new BadRequest('Nhập lại mật khẩu chưa đúng')

    const hashPass = await hashPassword(password)
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
