import mongoose from 'mongoose'

const requestBookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true,
      unique: true
    },
    descriptions: {
      type: String,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<any>('RequestBook', requestBookSchema)
