import { Request as ExpressRequest } from 'express'
import { Types } from 'mongoose'

interface SignIn {
  email: string
  password: string
}

interface SignUpType extends SignIn {
  name: string
  phoneNumber: string
}

interface PayloadTokenType {
  id: Types.ObjectId
  email: string
}
interface HeadersType {
  CLIENT_ID: string
  AUTHENTICATION: string
  REFRESH_TOKEN: string
}
interface UserRequestHeader {
  id: Types.ObjectId
  email: string
}
export { SignUpType, SignIn, PayloadTokenType, HeadersType, UserRequestHeader }
