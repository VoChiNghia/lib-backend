import { SusscessResponse } from '@/helpper'
import AuthService from '@/service/auth.service'
import BlogService from '@/service/blog.service'
import FileService from '@/service/file.service'
import PenaltyService from '@/service/penalty.service'
import { Request, Response, NextFunction } from 'express'

class PenaltyController {
  async createNewPenalty(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'create successfully',
      httpCode: 201,
      metadata: await PenaltyService.createNewPenalty(req.body)
    }).send(res)
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'successfully',
      httpCode: 201,
      metadata: await PenaltyService.getAllPenalty()
    }).send(res)
  }
}

export default new PenaltyController()
