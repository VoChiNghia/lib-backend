import { CategoryModelType } from '@/type/model.type'
import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema(
  {
    tenKhoa: {
      type: String,
      required: true
    },
    tenMonHoc: {
      type: String,
      required: true
    },
    giaovien: {
      type: String,
      required: true
    },
    filePdf: {
      type: String
    },
    image: {
      type: String,
      default:'',
      required: true
    }
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<CategoryModelType>('File', fileSchema)
