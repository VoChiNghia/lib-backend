import { BadRequest } from '@/helpper'
import logger from '@/logs'
import cloudinaryUploadImg from '@/middlewares/cloudinary'
import bookModel from '@/models/book.model'
import categoryModel from '@/models/category.model'
import { BookModelType } from '@/type/book.type'
import { convertStringToObjectId, createModel, validateObjectId } from '@/utils'
import { Request } from 'express'
import fs from 'fs'

class BookService {
  static async createNewBook(body: BookModelType) {
    try {
      const foundBook = await bookModel.findOne({ name: body.name })
      if (foundBook) throw new BadRequest('Book code already exist')

      const categoryId = validateObjectId(body.category) ? body.category : null;
      const category = await categoryModel.findById(categoryId);
      if (!category) throw new BadRequest('category not found')

      console.log({
        _id: category._id,
        name: category.name
      })
      const addNewBook = await createModel(bookModel, {
        ...body,
        category: {
          _id: category._id,
          name: category.name
        }
      })
      console.log(addNewBook)
      if (addNewBook) return addNewBook
    } catch (error: any) {
      logger.error('error when create new book')
      throw new Error(error)
    }
  }


  static async updateBook(bookId: string, body: BookModelType) {
    validateObjectId(bookId)
    const findBook = await bookModel.findById(bookId)
    if (!findBook) throw new BadRequest('Book Not found')

    const updateBook = await bookModel.findByIdAndUpdate(
      { _id: bookId },
      body,
      {
        new: true
      }
    )
    if (!updateBook) throw new BadRequest('update fail')
    return {
      message: 'update successfully'
    }
  }

  static async deleteBook(bookId: string) {
    validateObjectId(bookId)
    const findBook = await bookModel.findById(bookId)
    if (!findBook) throw new BadRequest('Book Not found')

    const deleteBook = await bookModel.findByIdAndDelete(bookId)
    if (!deleteBook) throw new BadRequest('some thing wrong')

    return deleteBook
  }

  static async getBook(bookId: string) {
    validateObjectId(bookId)
    const objectId = convertStringToObjectId(bookId)
    const getBook = await bookModel
      .findById(objectId)
      .populate('category')
      .lean()
    if (!getBook) throw new BadRequest('some thing wrong')

    return getBook
  }
  static async getAllBook(query: any) {
    const queryObj = { ...query }
    const totalDocument: number = await bookModel.countDocuments()
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((field) => delete queryObj[field])
    if (query.category) {
      delete queryObj['category']
      queryObj['category.name'] = query.category
    }
    if (query.name) {
      delete queryObj['name']
      queryObj['name'] = query.name
    }

    let queryBook = bookModel.find(queryObj)
    // sort
    if (query.sort) {
      const sortBy = query.sort.split(',').join(' ')
      queryBook = queryBook.sort(sortBy)
    } else {
      queryBook = queryBook.sort('-createdAt')
    }
    //get fields
    if (query.fields) {
      const fields = query.fields.split(',').join(' ')
      queryBook = queryBook.select(fields)
    } else {
      queryBook = queryBook.select('-__v')
    }
    //pagination
    if (query.page && query.limit) {
      const skip = (query.page - 1) * query.limit
      queryBook = queryBook.limit(query.limit).skip(skip)
      if (totalDocument <= skip)
        throw new BadRequest('this page dose not exist')
    }

    const allBook = await queryBook
    if (!allBook) throw new BadRequest('some thing wrong')

    return {
      allBook,
      totalDocument
    }
  }

  static async uploadCoverImage(req: Request) {
    const { id } = req.params
    try {
      cloudinaryUploadImg(req.file.path)
        .then(async (uploadedImg) => {
          await bookModel.findByIdAndUpdate(
            id,
            {
              coverImage: uploadedImg?.url
            },
            { new: true }
          )
          fs.unlinkSync(`public/images/cover/${req.file.filename}`)
          fs.unlinkSync(`public/images/${req.file.filename}`)
        })
        .catch((error) => {
          logger.error('Error uploading image:', error)
        })

      return {
        message: 'upload cover image successfully'
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async uploadCoverImageByBody(req: Request) {
    const { name, author, publishingYear } = req.query

    try {
      cloudinaryUploadImg(req.file.path)
        .then(async (uploadedImg) => {
          const findBook = await bookModel.findOne({
            name,
            author,
            publishingYear
          })
          if (findBook) {
            findBook.coverImage = uploadedImg.url
            await findBook.save()
          }
          fs.unlinkSync(`public/images/cover/${req.file.filename}`)
          fs.unlinkSync(`public/images/${req.file.filename}`)
        })
        .catch((error) => {
          logger.error('Error uploading image:', error)
        })

      return {
        message: 'upload cover image successfully'
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async uploadFilePdf(req: Request) {
    const { id } = req.params
    const currentUrl = req.protocol + '://' + req.get('host') + '/public/ebooks/' + req.file.filename
    try {
      await bookModel.findByIdAndUpdate(
        id,
        {
          format: {
            linkPdf: currentUrl
          }
        },
        { new: true }
      )
      return {
        message: 'upload cover image successfully'
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  
}

export default BookService
