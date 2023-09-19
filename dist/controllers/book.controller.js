"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("../helpper");
const book_service_1 = __importDefault(require("../service/book.service"));
class BookController {
    async createNewBook(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Create successfully',
            metadata: await book_service_1.default.createNewBook(req.body)
        }).send(res);
    }
    async deleteBook(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Delete successfully',
            metadata: await book_service_1.default.deleteBook(req.params.id)
        }).send(res);
    }
    async getBook(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get book successfully',
            metadata: await book_service_1.default.getBook(req.params.id)
        }).send(res);
    }
    async updateBook(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Update successfully',
            metadata: await book_service_1.default.updateBook(req.params.id, req.body)
        }).send(res);
    }
    async getAllBook(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get All Book',
            metadata: await book_service_1.default.getAllBook(req.query)
        }).send(res);
    }
    async uploadCoverImage(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Update cover book successfully',
            metadata: await book_service_1.default.uploadCoverImage(req)
        }).send(res);
    }
    async uploadCoverImageByBody(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Update cover book successfully',
            metadata: await book_service_1.default.uploadCoverImageByBody(req)
        }).send(res);
    }
    async uploadFilePdf(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Update successfully',
            metadata: await book_service_1.default.uploadFilePdf(req)
        }).send(res);
    }
}
exports.default = new BookController();
