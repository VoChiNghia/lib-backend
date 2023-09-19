import { SusscessResponse } from '@/helpper'
import AuthService from '@/service/auth.service'
import { Request, Response, NextFunction } from 'express'

class AuthController {
  async sendEmailVerify(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'email is pending',
      httpCode: 201,
      metadata: await AuthService.sendEmailVerify(req.body)
    }).send(res)
  }

 async signUp(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Created',
      httpCode: 201,
      metadata: await AuthService.signUp(req.params.token)
    }).send(res)
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'SignIn successfully',
      metadata: await AuthService.signIn(req.body)
    }).send(res)
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Logout successfully',
      metadata: await AuthService.logout(req.params.id)
    }).send(res)
  }

  async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'SignIn successfully',
      metadata: await AuthService.handleRefreshToken(req.user, req.refreshToken, req.keyStore)
    }).send(res)
  }

}

export default new AuthController()
