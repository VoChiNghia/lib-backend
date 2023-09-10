import { SusscessResponse } from '@/helpper'
import CategoryService from '@/service/category.service'
import { Request, Response, NextFunction, query } from 'express'

class CategoryController {
  async createNewBook(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Create category successfully',
      metadata: await CategoryService.createCategory(req.body)
    }).send(res)
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Create category successfully',
      metadata: await CategoryService.deleteCategory(req.params.id)
    }).send(res)
  }

  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Create category successfully',
      metadata: await CategoryService.getAllCategory()
    }).send(res)
  }
}

export default new CategoryController()
