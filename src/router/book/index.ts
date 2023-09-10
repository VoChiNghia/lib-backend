import express from 'express'
import { asyncHandler } from '@/utils'
import { authentication } from '@/middlewares/auth'
import BookController from '@/controllers/book.controller'
import { upload, coverImgProduct } from '@/middlewares/uploadFile'
const router = express.Router()

router.use(authentication)
router.post('/book', asyncHandler(BookController.createNewBook))
router.get('/book/all', asyncHandler(BookController.getAllBook))

router.put(
  '/book/cover-image',
  upload.single('image'),
  coverImgProduct,
  asyncHandler(BookController.uploadCoverImageByBody)
)

router.put('/book/file-pdf/:id', upload.single('pdf'), asyncHandler(BookController.uploadFilePdf))

router.get('/book/:id', asyncHandler(BookController.getBook))
//router.use(isAdmin)
router.delete('/book/:id', asyncHandler(BookController.deleteBook))
router.put('/book/:id', asyncHandler(BookController.updateBook))
router.put(
  '/book/cover-image/:id',
  upload.single('image'),
  coverImgProduct,
  asyncHandler(BookController.uploadCoverImage)
)

export default router
