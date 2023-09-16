import { SusscessResponse } from '@/helpper'
import BorrowBookService from '@/service/borrowBook.service'
import { Request, Response, NextFunction, query } from 'express'

class CategoryController {
  async createNewTicketBorrow(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'Create ticket borrow successfully',
      metadata: await BorrowBookService.createNewTicketBorrow(req.user.id, req.body)
    }).send(res)
  }

  async deleteTicketBorrow(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'delete successfully',
      metadata: await BorrowBookService.deleteTicketBorrow(req.params.id)
    }).send(res)
  }

  async updateStatusTicket(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'successfully',
      metadata: await BorrowBookService.updateStatusTicket(req.body.id, req.body.status)
    }).send(res)
  }

  async getAllBorrowBook(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'successfully',
      metadata: await BorrowBookService.getAllTicketBorrow()
    }).send(res)
  }

  async getBorrowBookByUser(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'successfully',
      metadata: await BorrowBookService.getBorrowBookByUser(req.user.id)
    }).send(res)
  }

  async getBorrowedBooksByMonth(req: Request, res: Response, next: NextFunction) {
    new SusscessResponse({
      message: 'successfully',
      metadata: await BorrowBookService.getBorrowedBooksByMonth()
    }).send(res)
  }
}

export default new CategoryController()
