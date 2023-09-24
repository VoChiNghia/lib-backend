"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("@/utils");
const auth_1 = require("@/middlewares/auth");
const book_controller_1 = __importDefault(require("@/controllers/book.controller"));
const uploadFile_1 = require("@/middlewares/uploadFile");
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.post('/book', (0, utils_1.asyncHandler)(book_controller_1.default.createNewBook));
router.get('/book/all', (0, utils_1.asyncHandler)(book_controller_1.default.getAllBook));
router.put('/book/cover-image', uploadFile_1.upload.single('image'), uploadFile_1.coverImgProduct, (0, utils_1.asyncHandler)(book_controller_1.default.uploadCoverImageByBody));
router.put('/book/file-pdf/:id', uploadFile_1.upload.single('pdf'), (0, utils_1.asyncHandler)(book_controller_1.default.uploadFilePdf));
router.get('/book/:id', (0, utils_1.asyncHandler)(book_controller_1.default.getBook));
//router.use(isAdmin)
router.delete('/book/:id', (0, utils_1.asyncHandler)(book_controller_1.default.deleteBook));
router.put('/book/:id', (0, utils_1.asyncHandler)(book_controller_1.default.updateBook));
router.put('/book/cover-image/:id', uploadFile_1.upload.single('image'), uploadFile_1.coverImgProduct, (0, utils_1.asyncHandler)(book_controller_1.default.uploadCoverImage));
exports.default = router;
