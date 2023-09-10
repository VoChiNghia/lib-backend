import userModel from '../user.model'

const findUserByEmail = async (email: string): Promise<any> => {
  return await userModel.findOne({ email })
}

export { findUserByEmail }
