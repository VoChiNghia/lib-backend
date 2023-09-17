import { BookModelType } from '@/type/book.type'
import mongoose from 'mongoose'
const { Types } = mongoose

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: {
      type: String,
      required: true,
      default: 'https://www.wpbeginner.com/wp-content/uploads/2020/04/featuredimageswp-og.png'
    },
    content: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User', require: true },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<BookModelType>('Blog', blogSchema)
