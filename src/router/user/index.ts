import express from 'express'
import { asyncHandler } from '@/utils'
import { authentication } from '@/middlewares/auth'
import UserController from '@/controllers/user.controller'
const router = express.Router()

router.use(authentication)
router.get('/user', asyncHandler(UserController.getUser))
router.put('/user/password', asyncHandler(UserController.updatePassword))

//router.use(isAdmin)
router.get('/all-user', asyncHandler(UserController.getAllUser))
router.put('/user', asyncHandler(UserController.updateUser))
router.put('/user/:id', asyncHandler(UserController.updateUser))
router.delete('/user/:id', asyncHandler(UserController.deleteUser))

export default router
