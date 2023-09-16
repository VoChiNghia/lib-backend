import { IBorrowBook } from '@/type/model.type'
import mongoose from 'mongoose'
const { Types } = mongoose

const borrowSchema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', require },
    bookId: { type: Types.ObjectId, ref: 'Book', require },
    borrowedDate: {
      type: Date,
      require
    },
    returnDate: {
      type: Date,
      require
    },
    status: {
      type: String,
      default: 'pending',
    }
  },
  {
    timestamps: true
  }
)

//Export the model
export default mongoose.model<IBorrowBook>('BorrowBook', borrowSchema)
