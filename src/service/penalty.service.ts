import { BadRequest } from '@/helpper'
import logger from '@/logs'
import cloudinaryUploadImg from '@/middlewares/cloudinary'
import blogModel from '@/models/blog.model'
import penaltyModel from '@/models/penalty.model'
import fs from 'fs'

class PenaltyService {
  static async createNewPenalty(body: any) {
    try {
      const penalty = await penaltyModel.create(body)
      return penalty
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async getAllPenalty() {
    try {
      const penalty = await penaltyModel.find().populate('bookId').populate('userId')
      return penalty
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default PenaltyService
