import { SusscessResponse } from '@/helpper'
import AuthService from '@/service/auth.service'
import BlogService from '@/service/blog.service'
import FileService from '@/service/file.service'
import { Request, Response, NextFunction } from 'express'

class FileController {
  async createNewBlog(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Successfully',
      httpCode: 201,
      metadata: await FileService.createFile(req.body)
    }).send(res)
  }

  async getAllFiles(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Successfully',
      httpCode: 201,
      metadata: await FileService.getAllFile()
    }).send(res)
  }

  async getFileById(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'create file',
      httpCode: 201,
      metadata: await FileService.getFileById(req.params.id)
    }).send(res)
  }

  async deleteFile(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Successfully',
      httpCode: 201,
      metadata: await FileService.deleteFile(req.params.id)
    }).send(res)
  }

  async updateFile(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Successfully',
      httpCode: 201,
      metadata: await FileService.uploadFilePdf(req)
    }).send(res)
  }

  async updateCoverImage(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Successfully',
      httpCode: 201,
      metadata: await FileService.uploadCoverImage(req)
    }).send(res)
  }

}

export default new FileController()
