import { CategoryModelType } from '@/type/model.type'
import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

//Export the model
export default mongoose.model<CategoryModelType>('Category', categorySchema)
