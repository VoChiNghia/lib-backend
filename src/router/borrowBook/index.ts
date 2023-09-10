import express from 'express'
import { asyncHandler } from '@/utils'
import { authentication } from '@/middlewares/auth'
import BorrowController from '@/controllers/borrow.controller'
const router = express.Router()

router.use(authentication)
router.put('/borrow/update-status', asyncHandler(BorrowController.updateStatusTicket))
router.put('/borrow/123', asyncHandler(BorrowController.updateStatusTicket))
router.get('/borrow', asyncHandler(BorrowController.getAllBorrowBook))
router.get('/borrow-user', asyncHandler(BorrowController.getBorrowBookByUser))
router.post('/borrow', asyncHandler(BorrowController.createNewTicketBorrow))
router.delete('/borrow/:id', asyncHandler(BorrowController.deleteTicketBorrow))

export default router
