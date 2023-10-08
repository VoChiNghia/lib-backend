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
      default:'https://4.bp.blogspot.com/-1pzAvHLMl8o/TtHk6rd-qWI/AAAAAAAAEn0/4eQH1X7_UIs/s1600/ScreenHunter_04+Nov.+27+14.11.gif',
    }
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<CategoryModelType>('File', fileSchema)
