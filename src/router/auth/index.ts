import express from 'express'
import AuthController from '@/controllers/auth.controller'
import { asyncHandler } from '@/utils'
import { authentication } from '@/middlewares/auth'
import smtpTransport from '@/nodemailer'
import transporter from '@/nodemailer'
import { info } from 'console'
import logger from '@/logs'
import AuthService from '@/service/auth.service'

const router = express.Router()

router.post('/auth/signup', asyncHandler(AuthController.sendEmailVerify))
router.post('/auth/signin', asyncHandler(AuthController.signIn))
router.delete('/auth/logout/:id', asyncHandler(AuthController.logout))
router.get('/auth/:token', asyncHandler(AuthService.signUp))
router.use(authentication)
router.post('/auth/refresh-token', asyncHandler(AuthController.handleRefreshToken))
export default router
