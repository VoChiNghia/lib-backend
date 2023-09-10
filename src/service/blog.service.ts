import { BadRequest } from '@/helpper'
import logger from '@/logs'
import cloudinaryUploadImg from '@/middlewares/cloudinary'
import blogModel from '@/models/blog.model'
import fs from 'fs'

class BlogService {
  static async createNewBlogContent(body: any) {
    try {
      const newBlog = await blogModel.create({
        title: body.title,
        content: body.content
      })
      return newBlog
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async getAllBlog() {
    try {
      const getAll = await blogModel.find()
      if(!getAll) throw new Error('Not found')
      return getAll
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async getBlog(id: any) {
    try {
      const getAll = await blogModel.findById(id)
      if(!getAll) throw new Error('Not found')
      return getAll
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async uploadThumnail(req: any) {
    try {
      cloudinaryUploadImg(req.file.path)
        .then(async (uploadedImg) => {
          try {
            await blogModel.findOneAndUpdate(
              req.query,
              {
                thumbnail: uploadedImg?.url
              },
              { new: true }
            )
          } catch (error) {
            console.log(error)
          }
          fs.unlinkSync(`public/images/cover/${req.file.filename}`)
          fs.unlinkSync(`public/images/${req.file.filename}`)
        })
        .catch((error) => {
          logger.error('Error uploading image:', error)
        })

      return {
        message: 'upload cover image successfully'
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}



export default BlogService
