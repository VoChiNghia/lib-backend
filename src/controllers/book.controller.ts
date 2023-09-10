import { SusscessResponse } from '@/helpper'
import BookService from '@/service/book.service'
import { Request, Response, NextFunction, query } from 'express'

class BookController {
  async createNewBook(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Create successfully',
      metadata: await BookService.createNewBook(req.body)
    }).send(res)
  }

  async deleteBook(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Delete successfully',
      metadata: await BookService.deleteBook(req.params.id)
    }).send(res)
  }

  async getBook(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get book successfully',
      metadata: await BookService.getBook(req.params.id)
    }).send(res)
  }

  async updateBook(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Update successfully',
      metadata: await BookService.updateBook(req.params.id, req.body)
    }).send(res)
  }

  async getAllBook(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Get All Book',
      metadata: await BookService.getAllBook(req.query)
    }).send(res)
  }

  async uploadCoverImage(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Update cover book successfully',
      metadata: await BookService.uploadCoverImage(req)
    }).send(res)
  }

  async uploadCoverImageByBody(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Update cover book successfully',
      metadata: await BookService.uploadCoverImageByBody(req)
    }).send(res)
  }

  async uploadFilePdf(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Update successfully',
      metadata: await BookService.uploadFilePdf(req)
    }).send(res)
  }
}

export default new BookController()
