import express from 'express'
import { asyncHandler } from '@/utils'
import { authentication, isAdmin } from '@/middlewares/auth'
import CategoryController from '@/controllers/category.controller'
const router = express.Router()

router.get('/category', asyncHandler(CategoryController.getAllCategory))
//router.use(authentication)
router.post('/category', asyncHandler(CategoryController.createNewBook))
router.delete('/category', asyncHandler(CategoryController.deleteCategory))

export default router
