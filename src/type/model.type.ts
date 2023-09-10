import mongoose, { Types } from 'mongoose'

interface TokenModelType {
  _id?: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.ObjectId
  refreshToken: string
  publicKey: string
  privateKey: string
  refreshTokenUsed: string[]
}

interface CategoryModelType {
  _id?: mongoose.Schema.Types.ObjectId
  name: string
}

interface IBorrowBook extends Document {
  userId: Types.ObjectId
  bookId: Types.ObjectId[]
  borrowedDate: Date
  returnDate: Date
  status: 'pending' | 'borrowed' | 'returned' | 'due'
  createdAt: Date
  updatedAt: Date
}

export { TokenModelType, CategoryModelType,IBorrowBook }
