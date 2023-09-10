import { BookModelType } from '@/type/book.type'
import mongoose from 'mongoose'
const { Types } = mongoose

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    publisher: {
      type: String,
      required: true
    },
    publishingYear: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.Mixed
    },
    format: {
      type: Array,
      default: []
    },
    summary: {
      type: String
    },
    quantity: {
      type: Number,
      required: true
    },
    images: [],
    coverImage: {
      type: String,
      default: 'https://dhmckee.com/wp-content/uploads/2018/11/defbookcover-min.jpg'
    },
    language: {
      type: String,
      default: 'vn'
    }
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<BookModelType>('Book', bookSchema)
