import express from 'express'
import { asyncHandler } from '@/utils'
import { authentication, isAdmin } from '@/middlewares/auth'
import CategoryController from '@/controllers/category.controller'
import blogController from '@/controllers/blog.controller'
import { coverImgProduct, upload } from '@/middlewares/uploadFile'
const router = express.Router()

router.post('/blog', asyncHandler(blogController.createNewBlog))
router.get('/blog', asyncHandler(blogController.getAllBlog))
router.get('/blog/:id', asyncHandler(blogController.getBlog))
router.delete('/blog/:id', asyncHandler(blogController.deleteBlog))
router.put(
  '/blog/cover-image',
  upload.single('image'),
  coverImgProduct,
  asyncHandler(blogController.uploadThumnail)
)

export default router
