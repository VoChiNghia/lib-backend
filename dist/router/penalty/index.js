"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("@/utils");
const auth_1 = require("@/middlewares/auth");
const penalty_controller_1 = __importDefault(require("@/controllers/penalty.controller"));
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.post('/penalty', (0, utils_1.asyncHandler)(penalty_controller_1.default.createNewPenalty));
router.get('/penalty', (0, utils_1.asyncHandler)(penalty_controller_1.default.getAll));
// router.put('/file/cover-image/:id', upload.single('image'), asyncHandler(fileController.updateCoverImage))
// router.get('/file/:id', asyncHandler(fileController.getFileById))
// router.put('/file/:id', asyncHandler(fileController.updateFile))
// router.delete('/file/:id', asyncHandler(fileController.deleteFile))
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
