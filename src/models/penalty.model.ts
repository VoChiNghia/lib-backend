import mongoose from 'mongoose'

// Định nghĩa schema cho phiếu phạt
const penaltySchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, required: true },
  requireRecover: { type: String, required: true }
});


export default mongoose.model<any>('Penalty', penaltySchema)