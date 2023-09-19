"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logs_1 = __importDefault(require("../logs"));
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const blog_model_1 = __importDefault(require("../models/blog.model"));
const fs_1 = __importDefault(require("fs"));
class BlogService {
    static async createNewBlogContent(body, id) {
        try {
            const newBlog = await blog_model_1.default.create({
                title: body.title,
                content: body.content,
                userId: id
            });
            return newBlog;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getAllBlog() {
        try {
            const getAll = await blog_model_1.default.find().populate('userId');
            if (!getAll)
                throw new Error('Not found');
            return getAll;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getBlog(id) {
        try {
            const getAll = await blog_model_1.default.findById(id);
            if (!getAll)
                throw new Error('Not found');
            return getAll;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async deleteBlog(id) {
        try {
            const getAll = await blog_model_1.default.findByIdAndDelete(id);
            if (!getAll)
                throw new Error('Not found');
            return getAll;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async uploadThumnail(req) {
        try {
            (0, cloudinary_1.default)(req.file.path)
                .then(async (uploadedImg) => {
                try {
                    await blog_model_1.default.findOneAndUpdate(req.query, {
                        thumbnail: uploadedImg?.url
                    }, { new: true });
                }
                catch (error) {
                    console.log(error);
                }
                fs_1.default.unlinkSync(`public/images/cover/${req.file.filename}`);
                fs_1.default.unlinkSync(`public/images/${req.file.filename}`);
            })
                .catch((error) => {
                logs_1.default.error('Error uploading image:', error);
            });
            return {
                message: 'upload cover image successfully'
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = BlogService;
