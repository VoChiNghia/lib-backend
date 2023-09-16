import mongoose from 'mongoose'

const favoriteBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  listBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

export default mongoose.model<any>('FavoriteBook', favoriteBookSchema)

