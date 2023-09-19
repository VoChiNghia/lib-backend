"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils");
const blog_controller_1 = __importDefault(require("../../controllers/blog.controller"));
const uploadFile_1 = require("../../middlewares/uploadFile");
const router = express_1.default.Router();
router.post('/blog', (0, utils_1.asyncHandler)(blog_controller_1.default.createNewBlog));
router.get('/blog', (0, utils_1.asyncHandler)(blog_controller_1.default.getAllBlog));
router.get('/blog/:id', (0, utils_1.asyncHandler)(blog_controller_1.default.getBlog));
router.delete('/blog/:id', (0, utils_1.asyncHandler)(blog_controller_1.default.deleteBlog));
router.put('/blog/cover-image', uploadFile_1.upload.single('image'), uploadFile_1.coverImgProduct, (0, utils_1.asyncHandler)(blog_controller_1.default.uploadThumnail));
exports.default = router;
