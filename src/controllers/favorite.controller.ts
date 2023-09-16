import { SusscessResponse } from '@/helpper'
import favoriteModel from '@/models/favorite.model'

interface FavoriteDocument {
  user: any
  listBooks?: any[]
}

export const addFavoriteBook = async (req: any, res: any) => {
  const { prodId, user } = req.body
  try {
    const findListFavorite = await favoriteModel.findOne({ user: user })

    if (!findListFavorite) {
      const newList = await favoriteModel.create({
        user: user,
        listBooks: [prodId]
      })
      res.json(newList)
    } else {
      const listBook: any = favoriteModel.find({ user: user })

      const index: any = listBook.listBooks?.indexOf(prodId)

      if (index === -1) {
        findListFavorite.listBooks.push(prodId)
        res.json('added')
      } else {
        findListFavorite.listBooks[index] = prodId
        res.json('added')
      }
    }
  } catch (error: any) {
    throw new Error(error)
  }
}


export const addBookToFavorite = async (body: any) => {
  const {userId,bookId} = body
  try {
    // Tìm một bản ghi FavoriteBook dựa trên userId
    const favoriteBook = await favoriteModel.findOne({ user: userId });

    // Nếu không tìm thấy bản ghi, tạo một bản ghi mới
    if (!favoriteBook) {
      const newFavoriteBook = favoriteModel.create({
        user: userId,
        listBooks: [bookId]
      });
      return { success: true, message: 'Sách đã được thêm vào danh sách yêu thích thành công' };
    }

    // Nếu tìm thấy bản ghi, kiểm tra xem bookId đã tồn tại trong listBooks chưa
    if (favoriteBook.listBooks.includes(bookId)) {
      return { success: false, message: 'Sách đã tồn tại trong danh sách yêu thích' };
    }

    // Nếu bookId chưa tồn tại trong listBooks, thêm nó vào
    favoriteBook.listBooks.push(bookId);
    await favoriteBook.save();

    return { success: true, message: 'Sách đã được thêm vào danh sách yêu thích thành công' };
  } catch (error) {
    return { success: false, message: 'Đã xảy ra lỗi khi thêm sách vào danh sách yêu thích' };
  }
}

export const addBookToFavoriteReturn = async (req: Request, res: any) => {
  new SusscessResponse({
    message: 'Successfully',
    httpCode: 201,
    metadata: await addBookToFavorite(req.body)
  }).send(res)
}

export const getListFavoriteByUser = async (req: any, res: any) => {
  const { id } = req.params
  try {
      const favoriteBook = await favoriteModel.findOne({ user: id }).populate('listBooks');

    res.json(favoriteBook)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getListFavorite = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const getByUser = await favoriteModel.findById(id)
    res.json(getByUser)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllListFavorite = async (req: any, res: any) => {
  try {
    const getAllListFavorite = await favoriteModel
      .find()
      .populate('user')
      .populate({
        path: 'listBooks',
        model: 'Book'
      })
      .exec()
    res.json(getAllListFavorite)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteListFavoriteByUser = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const deleteListFavoriteByUser = await favoriteModel.findOneAndDelete({
      user: id
    })
    res.json(deleteListFavoriteByUser)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteListItemListBook = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const deleteListFavoriteByUser = await favoriteModel.findOne({
      user: id
    })
    res.json(deleteListFavoriteByUser)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteItemFromListBooks = async (req: any, res: any) => {
  const { _id, userId } = req.body

  try {
    // Tìm dữ liệu của người dùng với userId
    const favoriteBook = await favoriteModel.findOne({ user: userId })

    if (!favoriteBook) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' })
    }

    const updatedListBooks = favoriteBook.listBooks.filter(
      (bookId: any) => !bookId.equals(_id)
    )

    // Cập nhật listBooks mới
    favoriteBook.listBooks = updatedListBooks
    // Lưu thay đổi vào cơ sở dữ liệu
    await favoriteBook.save()

    return res.status(200).json({ message: 'Xóa mục thành công' })
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' })
  }
}
