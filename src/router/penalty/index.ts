import express from 'express'
import { asyncHandler } from '@/utils'
import { authentication } from '@/middlewares/auth'
import BookController from '@/controllers/book.controller'
import { upload, coverImgProduct } from '@/middlewares/uploadFile'
import penaltyController from '@/controllers/penalty.controller'

const router = express.Router()

router.use(authentication)
router.post('/penalty', asyncHandler(penaltyController.createNewPenalty))
router.get('/penalty', asyncHandler(penaltyController.getAll))
// router.put('/file/cover-image/:id', upload.single('image'), asyncHandler(fileController.updateCoverImage))
// router.get('/file/:id', asyncHandler(fileController.getFileById))
// router.put('/file/:id', asyncHandler(fileController.updateFile))
// router.delete('/file/:id', asyncHandler(fileController.deleteFile))

// router.put(
//   '/book/cover-image',
//   upload.single('image'),
//   coverImgProduct,
//   asyncHandler(BookController.uploadCoverImageByBody)
// )


// router.get('/book/:id', asyncHandler(BookController.getBook))
// //router.use(isAdmin)
// router.delete('/book/:id', asyncHandler(BookController.deleteBook))
// router.put('/book/:id', asyncHandler(BookController.updateBook))
// router.put(
//   '/book/cover-image/:id',
//   upload.single('image'),
//   coverImgProduct,
//   asyncHandler(BookController.uploadCoverImage)
// )

export default router
