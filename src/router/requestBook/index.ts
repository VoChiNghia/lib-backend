import express from 'express'

import { authentication } from '@/middlewares/auth'
import {
  createRequestBook,
  deleteRequestBook,
  getAllRequestBook,
  getRequestBook
} from '@/controllers/requestBook.controller'

const router = express.Router()

router.use(authentication)
router.post('/request-book', createRequestBook)
router.get('/request-book', getAllRequestBook)
router.get('/request-book/:id', getRequestBook)
// router.get('/:id', getListFavorite)
router.delete('/request-book/:id', deleteRequestBook)

export default router
