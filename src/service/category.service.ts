import { BadRequest } from '@/helpper'
import categoryModel from '@/models/category.model'
import { CategoryModelType } from '@/type/model.type'
import { createModel, validateObjectId } from '@/utils'

class CategoryService {
  static async createCategory(body: CategoryModelType) {
    try {
      const addCategory = await createModel(categoryModel, body)
      return addCategory
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async deleteCategory(id: string) {
    validateObjectId(id)
    try {
      const delCate = await categoryModel.findByIdAndDelete(id)
      if (!delCate) throw new BadRequest('Category not found')
      return delCate
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async getAllCategory() {
    try {
      const getAllCategory = await categoryModel.find().select('-__v')
      return getAllCategory
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default CategoryService
