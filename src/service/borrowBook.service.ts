import { BadRequest } from '@/helpper'
import logger from '@/logs'
import borrowBookModel from '@/models/borrowBook.model'
import userModel from '@/models/user.model'
import { KeyValuePair } from '@/type/utils.type'
import { createModel, validateObjectId } from '@/utils'
import { Types } from 'mongoose'

class BorrowBookService {
  static async createNewTicketBorrow(
    id: Types.ObjectId,
    body: KeyValuePair<string | string[]>
  ) {
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
    const getAll = await borrowBookModel
      .find()
      .populate('userId')
      .populate('bookId')

    if (!getAll) throw new BadRequest('not book borrow')
    return getAll
  }

  static async getBorrowBookByUser(userId: any) {
    const getAll = await borrowBookModel
      .find({ 'userId._id': userId })
      .populate('userId')
      .populate('bookId')

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

  static async getBorrowedBooksByMonth() {
    try {
      // Sử dụng aggregation framework để nhóm theo tháng và tính tổng số lượng sách mượn/trả
      const result = await borrowBookModel.aggregate([
        {
          $match: {
            status: { $in: ['return', 'borrowed'] } // Lọc bản ghi với status là "return" hoặc "borrowed"
          }
        },
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' }, // Sử dụng trường "createdAt" thay vì "timestamps.createdAt"
              year: { $year: '$createdAt' } // Sử dụng trường "createdAt" thay vì "timestamps.createdAt"
            },
            countReturn: {
              $sum: {
                $cond: {
                  if: { $eq: ['$status', 'return'] }, // Nếu status là "return"
                  then: 1, // Thì tăng biến đếm lên 1
                  else: 0 // Ngược lại không tăng
                }
              }
            },
            countBorrow: {
              $sum: {
                $cond: {
                  if: { $eq: ['$status', 'borrowed'] }, // Nếu status là "borrowed"
                  then: 1, // Thì tăng biến đếm lên 1
                  else: 0 // Ngược lại không tăng
                }
              }
            }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 } // Sắp xếp theo năm và tháng
        }
      ])
      // Tạo mảng 12 tháng với giá trị mặc định là 0
      const monthlyCounts = Array(12).fill(0)

      // Điền dữ liệu từ kết quả aggregation vào mảng monthlyCounts
      result.forEach((item) => {
        console.log(item)
        const month = item._id.month - 1 // Trừ 1 vì các tháng trong JavaScript bắt đầu từ 0
        monthlyCounts[month] = {
          countReturn: item.countReturn,
          countBorrow: item.countBorrow,
          count: item.count
        }
      })

      // Trả về mảng số lượng sách mượn/trả theo từng tháng
      return monthlyCounts
    } catch (error) {
      throw new Error('Đã xảy ra lỗi khi lấy dữ liệu.')
    }
  }
}

export default BorrowBookService
