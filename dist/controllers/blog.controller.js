"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("@/helpper");
const blog_service_1 = __importDefault(require("@/service/blog.service"));
class BlogController {
    async createNewBlog(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create blog',
            httpCode: 201,
            metadata: await blog_service_1.default.createNewBlogContent(req.body)
        }).send(res);
    }
    async uploadThumnail(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create blog',
            httpCode: 201,
            metadata: await blog_service_1.default.uploadThumnail(req)
        }).send(res);
    }
    async getAllBlog(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'suscess',
            httpCode: 200,
            metadata: await blog_service_1.default.getAllBlog()
        }).send(res);
    }
    async getBlog(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'suscess',
            httpCode: 200,
            metadata: await blog_service_1.default.getBlog(req.params.id)
        }).send(res);
    }
}
exports.default = new BlogController();
