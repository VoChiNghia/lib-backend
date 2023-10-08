import { BadRequest } from '@/helpper'
import logger from '@/logs'
import cloudinaryUploadImg from '@/middlewares/cloudinary'
import categoryModel from '@/models/category.model'
import fileModel from '@/models/file.model'
import { CategoryModelType } from '@/type/model.type'
import { createModel, validateObjectId } from '@/utils'
import fs from 'fs'

class FileService {
  
  static async createFile(body: any) {
    const getFile = await fileModel.find(body)
    console.log(getFile)
    if(getFile.length !== 0) {throw new Error("file đã tồn tại")}
 
    try {
      
      const newFile = await fileModel.create(body)
      console.log(newFile)
      if (!newFile) throw new Error('Not found')
      return newFile
    
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async getAllFile() {
    try {
      const getAll = await fileModel.find()
      if (!getAll) throw new Error('Not found')
      return getAll
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async getFileById(id: any) {
    try {
      const getAll = await fileModel.findById(id)
      if (!getAll) throw new Error('Not found')
      return getAll
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async deleteFile(id: any) {
    const file = await fileModel.findByIdAndDelete(id)
    if (!file) {
      throw new Error('Not found')
    }
    return file
  }

  static async updateFile (id: any,body: any) {
    try {
      const updatedFile = await fileModel.findByIdAndUpdate(id, body, { new: true });
      if (!updatedFile) {
        throw new Error('Not found')
      }
     return updatedFile
    } catch (error) {
      throw new Error('error')
    }
  }

  static async searchFiles (req: any) {
    try {
      const { tenKhoa, tenMonHoc, giaovien } = req.query;
      const query: any = {};
      if (tenKhoa) query.tenKhoa = tenKhoa;
      if (tenMonHoc) query.tenMonHoc = tenMonHoc;
      if (giaovien) query.giaovien = giaovien;
  
      const files = await fileModel.find(query);
      return files
    } catch (error) {
      throw new Error('error')
    }
  }

  static async uploadFilePdf(req: any) {
    const currentUrl = req.protocol + '://' + req.get('host') + '/public/ebooks/' + req?.file?.filename
    try {
      await fileModel.findOneAndUpdate(
        req.query,
        {
          filePdf: currentUrl
        },
        { new: true }
      )
      return {
        message: 'upload cover image successfully'
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  static async uploadCoverImage (req: any) {
    const { id } = req.params
    console.log(id)
    try {
      cloudinaryUploadImg(req.file.path)
        .then(async (uploadedImg) => {
          console.log( uploadedImg?.url)
          
          await fileModel.findByIdAndUpdate(
            id,
            {
              image: uploadedImg?.url
            },
            { new: true }
          )
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

export default FileService
