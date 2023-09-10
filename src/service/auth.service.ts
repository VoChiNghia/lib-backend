import userModel from '@/models/user.model'
import { SignIn, SignUpType } from '@/type/auth.type'
import { generateToken, hashPassword } from '@/middlewares/auth'
import { createModel, getInforData, getUserInfo } from '@/utils'
import { BadRequest, Forbidden } from '@/helpper'
import { findUserByEmail } from '@/models/repository'
import { generateKeyPair } from '@/middlewares/auth'
import tokenModel from '@/models/token.model'
import logger from '@/logs'
import { TokenModelType } from '@/type/model.type'
import transporter from '@/nodemailer'
import contentFile from '@/nodemailer/contentResponse'
import jwt from 'jsonwebtoken'

class AuthService {
  static async signUp(token: string) {
    const decode: any = await jwt.verify(token, 'nghia')
    const newUser = await createModel(userModel,{
      name: decode.name,
      email: decode.email,
      password: decode.password,
      phoneNumber: decode.phoneNumber,
    })

    if (!newUser) throw new BadRequest('register fail')
    return 'register successfully'
  }

  static async sendEmailVerify({ name, email, password, phoneNumber }: SignUpType) {
    const findUserByEmail = await userModel.findOne({ email })
    if (findUserByEmail) throw new BadRequest('User registered')
    const hashPass = await hashPassword(password)
    const user = {
      name: name,
      email: email,
      password: hashPass,
      phoneNumber: phoneNumber
    }

    const token = await jwt.sign(user, 'nghia', { expiresIn: '10m' })

    const info: any = await transporter.sendMail(
      {
        from: 'Library-management-system',
        to: email,
        subject: 'Verify password',
        text: 'Hello world?',
        html: contentFile(email, name, password, token)
      },
      (err, response: any) => {
        if (err) {
          logger.error('some thing wrong when send email')
        }
        return response.response
      }
    )

    return info
  }

  static async signIn({ email, password }: SignIn) {
    const findUser = await findUserByEmail(email)
    if (!findUser) throw new BadRequest('User not found')

    if (findUser && (await findUser.isPasswordMatched(password))) {
      const { publicKey, privateKey } = generateKeyPair()
      const { accessToken, refreshToken } = await generateToken({ id: findUser._id, email: findUser.email }, privateKey)

      const newTokenModel = await tokenModel.findOneAndUpdate(
        { userId: findUser._id },
        {
          accessToken,
          refreshToken,
          userId: findUser._id,
          publicKey: publicKey,
          privateKey: privateKey
        },
        {
          upsert: true,
          new: true
        }
      )
      if (!newTokenModel) {
        logger.error('Create token model failed')
        throw new BadRequest('some thing error when save token')
      }

      return {
        user: getUserInfo(findUser),
        token: { accessToken, refreshToken }
      }
    } else {
      throw new BadRequest('Password invalid')
    }
  }

  static async handleRefreshToken(user: any, refreshToken: string, keyStore: TokenModelType) {
    const { id, email } = user

    const findRefreshTokenUsed = await tokenModel.findOne({
      refreshTokenUsed: { $in: [refreshToken] }
    })
    if (findRefreshTokenUsed) {
      logger.error('user use token expired')
      await tokenModel.findByIdAndDelete(keyStore._id)
      throw new Forbidden('user forbidden')
    }

    if (keyStore.refreshToken !== refreshToken) throw new BadRequest('Refresh token invalid')

    const tokens = await generateToken({ id, email }, keyStore.privateKey)

    const newToken = await tokenModel.findOneAndUpdate(
      { userId: id },
      {
        $push: {
          refreshTokenUsed: refreshToken
        },
        $set: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        }
      },
      {
        new: true
      }
    )
    return {
      user: id,
      token: tokens
    }
  }

  static logout = async (id: string) => {
    const del = await tokenModel.findOneAndDelete({ userId: id })
    return {
      del
    }
  }
}

export default AuthService