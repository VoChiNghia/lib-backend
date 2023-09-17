import { PayloadTokenType, UserRequestHeader } from '@/type/auth.type'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import Jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { BadRequest, Forbidden } from '@/helpper'
import tokenModel from '@/models/token.model'
import { HEADERS } from '@/constant'
import { asyncHandler } from '@/utils'
import { TokenModelType } from '@/type/model.type'
import userModel from '@/models/user.model'

declare module 'express-serve-static-core' {
  interface Request {
    keyStore: TokenModelType
    refreshToken: string
    user: UserRequestHeader
    file: any
  }
}

const hashPassword = async (password: any): Promise<string> => {
  const salt: string = await bcrypt.genSalt(10)
  const hashedPassword: string = await bcrypt.hash(password, salt)
  return hashedPassword
}

const generateKeyPair = (): { publicKey: string; privateKey: string } => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  })
  return { publicKey, privateKey }
}

const generateToken = async (payload: PayloadTokenType, privateKey: string): Promise<any> => {
  const accessToken = await Jwt.sign(payload, privateKey, {
    expiresIn: '3 days',
    algorithm: 'RS256'
  })
  const refreshToken = await Jwt.sign(payload, privateKey, {
    expiresIn: '7 days',
    algorithm: 'RS256'
  })

  return { accessToken, refreshToken }
}

const verifyToken = async (token: string, publicKey: string | undefined): Promise<any> => {
  if (!publicKey) throw new BadRequest('something wrong')
  return await Jwt.verify(token, publicKey)
}

const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const userId = req.headers[HEADERS.CLIENT_ID] as string
  if (!userId) throw new BadRequest('Invalid client id')
  const keyStore = await tokenModel.findOne({ userId })

  if (!keyStore) throw new Forbidden('User forbidden')

  const refreshToken = req.headers[HEADERS.REFRESH_TOKEN] as string
  if (refreshToken) {
    const decode = await verifyToken(refreshToken, keyStore.publicKey)
    req.keyStore = keyStore
    req.user = {
      id: decode.id,
      email: decode.email
    }
    req.refreshToken = refreshToken
    return next()
  }
  const accessToken = req.headers[HEADERS.AUTHENTICATION] as string

  if (!accessToken) throw new Forbidden('User forbidden')

  const decode = await verifyToken(accessToken, keyStore.publicKey)

  req.keyStore = keyStore
  req.user = {
    id: decode.id,
    email: decode.email
  }


  return next()
})

const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADERS.CLIENT_ID] as string
  if (!userId) throw new BadRequest('Invalid client id')

  const findUser = await userModel.findById({ _id: userId })
  if (!findUser) throw new BadRequest('User not found')
  console.log(findUser.role)
  if (findUser.role !== 'admin') throw new Forbidden('User forbidden')
  next()
})

export { hashPassword, generateKeyPair, generateToken, authentication, isAdmin }
