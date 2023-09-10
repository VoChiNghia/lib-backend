import { TokenModelType } from '@/type/model.type'
import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    refreshToken: {
      type: String,
      require: true
    },
    publicKey: {
      type: String,
      require: true
    },
    privateKey: {
      type: String,
      require: true
    },
    refreshTokenUsed: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)

//Export the model
export default mongoose.model<TokenModelType>('Token', tokenSchema)
