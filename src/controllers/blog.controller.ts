import { SusscessResponse } from '@/helpper'
import AuthService from '@/service/auth.service'
import BlogService from '@/service/blog.service'
import { Request, Response, NextFunction } from 'express'

class BlogController {
  async createNewBlog(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'create blog',
      httpCode: 201,
      metadata: await BlogService.createNewBlogContent(req.body)
    }).send(res)
  }

  async uploadThumnail(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'create blog',
      httpCode: 201,
      metadata: await BlogService.uploadThumnail(req)
    }).send(res)
  }

  async getAllBlog(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'suscess',
      httpCode: 200,
      metadata: await BlogService.getAllBlog()
    }).send(res)
  }

  async getBlog(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'suscess',
      httpCode: 200,
      metadata: await BlogService.getBlog(req.params.id)
    }).send(res)
  }

}

export default new BlogController()
