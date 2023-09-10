import { BadRequest } from '@/helpper'
import logger from '@/logs'
import borrowBookModel from '@/models/borrowBook.model'
import userModel from '@/models/user.model'
import { KeyValuePair } from '@/type/utils.type'
import { createModel, validateObjectId } from '@/utils'
import { Types } from 'mongoose'

class BorrowBookService {
  static async createNewTicketBorrow(id: Types.ObjectId, body: KeyValuePair<string | string[]>) {
    const findBorrowBook = await borrowBookModel.findOne({
      userId: id,
      bookId: body.bookId
    })
    if (findBorrowBook) throw new BadRequest('this book already borrowed')

    try {
      const borrowBook = await createModel(borrowBookModel, {
        ...body,
        userId: id
      })
      return borrowBook
    } catch (error: any) {
      logger.error(error.message)
      throw new BadRequest(error)
    }
  }

  static async deleteTicketBorrow(id: string) {
    validateObjectId(id)
    const del = await borrowBookModel.findByIdAndDelete(id)
    if (!del) throw new BadRequest('not book borrow')
    return del
  }

  static async getAllTicketBorrow() {
    const getAll = await borrowBookModel.find().populate('userId').populate('bookId');

    if (!getAll) throw new BadRequest('not book borrow')
    return getAll
  }

  static async getBorrowBookByUser(userId: any) {
    const getAll = await borrowBookModel.find({ "userId._id": userId }).populate('userId').populate('bookId');

    if (!getAll) throw new BadRequest('not book borrow')
    return getAll
  }

  static async updateStatusTicket(id: string, status: any) {
    validateObjectId(id)
    const foundTicketBorrow = await borrowBookModel.findById(id)
    if (!foundTicketBorrow) throw new BadRequest('not found book borrow')

    foundTicketBorrow.status = status
    await foundTicketBorrow.save()
    return foundTicketBorrow
  }
}

export default BorrowBookService
