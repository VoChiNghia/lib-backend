import express from 'express'
import {
  addFavoriteBook,
  getListFavoriteByUser,
  getAllListFavorite,
  deleteListFavoriteByUser,
  getListFavorite,
  deleteItemFromListBooks,
  addBookToFavorite,
  addBookToFavoriteReturn
} from '../../controllers/favorite.controller'
import { authentication } from '@/middlewares/auth'
const router = express.Router()
router.use(authentication)

router.post('/favorite', addBookToFavoriteReturn)
// router.post('/favorite', addFavoriteBook)
router.get('/favorite', getAllListFavorite)
router.post('/favorite/delete-item-list-book', deleteItemFromListBooks)
router.get('/favorite-user/:id', getListFavoriteByUser)
router.get('/favorite/:id', getListFavorite)
router.delete('favorite/:id', deleteListFavoriteByUser)

export default router
