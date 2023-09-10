import { SusscessResponse } from '@/helpper'
import UserService from '@/service/user.service'
import { Request, Response, NextFunction, query } from 'express'

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get user successfully',
      metadata: await UserService.getUser(req.user.id)
    }).send(res)
  }

  async getAllUser(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get user successfully',
      metadata: await UserService.getAllUser()
    }).send(res)
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get user successfully',
      metadata: await UserService.updateUser(req.user.id, req.body)
    }).send(res)
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get user successfully',
      metadata: await UserService.updateUser(req.params.id, req.body)
    }).send(res)
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get user successfully',
      metadata: await UserService.updatePassword(req.user.id, req.body)
    }).send(res)
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get user successfully',
      metadata: await UserService.deleteUser(req.params.id)
    }).send(res)
  }

}

export default new UserController()
