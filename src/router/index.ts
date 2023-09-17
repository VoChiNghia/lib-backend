import express from 'express'
const router = express.Router()
import auth from './auth'
import user from './user'
import book from './book'
import category from './category'
import borrowBook from './borrowBook'
import blog from './blog'
import file from './file'
import penalty from './penalty'
import favorite from './favorite'
import requestBook from './requestBook'

router.use('/v1/api', auth)
router.use('/v1/api', user)
router.use('/v1/api', book)
router.use('/v1/api', category)
router.use('/v1/api', borrowBook)
router.use('/v1/api', blog)
router.use('/v1/api', file)
router.use('/v1/api', penalty)
router.use('/v1/api', favorite)
router.use('/v1/api', requestBook)

export default router
