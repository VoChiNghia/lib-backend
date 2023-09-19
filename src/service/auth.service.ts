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
  // static async signUp(token: string) {
  //   const decode: any = await jwt.verify(token, 'nghia')
  //   const newUser = await createModel(userModel,{
  //     name: decode.name,
  //     email: decode.email,
  //     password: decode.password,
  //     phoneNumber: decode.phoneNumber,
  //   })

  //   if (!newUser) throw new BadRequest('register fail')
  //   return ` <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <title>Trang chủ</title>
  //     </head>
  //     <body>
  //       <h1>Đăng ký tài khoản thành công!</h1>
  //     </body>
  //   </html>`
  // }

  static async signUp(req: any, res: any) {
    const decode: any = await jwt.verify(req.params.token, 'nghia')
    const newUser = await createModel(userModel,{
      name: decode.name,
      email: decode.email,
      password: decode.password,
      phoneNumber: decode.phoneNumber,
    })

    if (!newUser) throw new BadRequest('register fail')
    res.send(` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đăng ký tài khoản thành công</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            
            .container {
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: 1px solid orangered;
            }
            
            .success-icon {
                color: #28a745;
                font-size: 48px;
            }
            
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            
            p {
                font-size: 18px;
                margin-bottom: 20px;
            }
            
            a {
                text-decoration: none;
                color: #007bff;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <i class="fas fa-check-circle success-icon"></i>
            <h1>Đăng ký tài khoản thành công!</h1>
            <p>Tài khoản của bạn đã được tạo thành công.</p>
            <a href="https://donganlibrary.online">Đăng nhập</a>
        </div>
    </body>
    </html>`)
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
