"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("@/utils");
const auth_1 = require("@/middlewares/auth");
const uploadFile_1 = require("@/middlewares/uploadFile");
const file_controller_1 = __importDefault(require("@/controllers/file.controller"));
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.put('/file/file-pdf', uploadFile_1.upload.single('pdf'), (0, utils_1.asyncHandler)(file_controller_1.default.updateFile));
router.post('/file', (0, utils_1.asyncHandler)(file_controller_1.default.createNewBlog));
router.get('/file', (0, utils_1.asyncHandler)(file_controller_1.default.getAllFiles));
router.put('/file/cover-image/:id', uploadFile_1.upload.single('image'), (0, utils_1.asyncHandler)(file_controller_1.default.updateCoverImage));
router.get('/file/:id', (0, utils_1.asyncHandler)(file_controller_1.default.getFileById));
router.put('/file/:id', (0, utils_1.asyncHandler)(file_controller_1.default.updateFile));
router.delete('/file/:id', (0, utils_1.asyncHandler)(file_controller_1.default.deleteFile));
// router.put(
//   '/book/cover-image',
//   upload.single('image'),
//   coverImgProduct,
//   asyncHandler(BookController.uploadCoverImageByBody)
// )
// router.get('/book/:id', asyncHandler(BookController.getBook))
// //router.use(isAdmin)
// router.delete('/book/:id', asyncHandler(BookController.deleteBook))
// router.put('/book/:id', asyncHandler(BookController.updateBook))
// router.put(
//   '/book/cover-image/:id',
//   upload.single('image'),
//   coverImgProduct,
//   asyncHandler(BookController.uploadCoverImage)
// )
exports.default = router;
