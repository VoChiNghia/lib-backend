import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String
    },
    studentCode: {
      type: String
    },
    role: { type: String, default: 'user' },
    borrowedBook: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BorrowBook'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.methods.isPasswordMatched = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

//Export the model
export default mongoose.model('User', userSchema)
