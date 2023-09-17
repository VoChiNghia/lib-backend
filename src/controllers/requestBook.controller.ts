import requestBookModel from '@/models/requestBook.model'

export const createRequestBook = async (req: any, res: any) => {
  const { id } = req.user
  try {
    const newRequestBook = await requestBookModel.create({
      ...req.body,
      user: id
    })
    res.json(newRequestBook)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteRequestBook = async (req: any, res: any) => {
  const { id } = req.params

  try {
    const updateRequestBook = await requestBookModel.findByIdAndDelete(id)
    res.json(updateRequestBook)
  } catch (error: any) {
    throw new Error(error)
    
  }
}

export const getRequestBook = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const getRequestBook = await requestBookModel.findById(id).populate({
      path: 'user',
      select: '-password -citizenNumber -role'
    })
    res.json(getRequestBook)
  } catch (error: any) {
    throw new Error(error)
    
  }
}

export const getAllRequestBook = async (req: any, res: any) => {
  try {
    const getAllRequestBook = await requestBookModel.find().populate('user')
    res.json(getAllRequestBook)
  } catch (error: any) {
    throw new Error(error)
  }
}

