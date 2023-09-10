import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'
import { NextFunction, Request } from 'express'
import sharp from 'sharp'
import { asyncHandler } from '@/utils'
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, path.join(__dirname, '../../public/ebooks'))
    } else {
      cb(null, path.join(__dirname, '../../public/images'))
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`)
  }
})

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  const allowedFileTypes: string[] = ['image/jpeg', 'image/png', 'application/pdf']

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true) // Accept the file
  } else {
    cb(null, false) // Reject the file
  }
}

const coverImgProduct = asyncHandler(async (req: any, res: any, next: NextFunction): Promise<void> => {
  if (!req.file) return next()

  await sharp(req.file.path)
    .resize(400, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/cover/${req.file.filename}`)

  req.file.path = path.join(__dirname, `../../public/images/cover/${req.file.filename}`)

  next()
})

const upload = multer({
  storage: multerStorage,
  fileFilter
})

export { upload, coverImgProduct }
