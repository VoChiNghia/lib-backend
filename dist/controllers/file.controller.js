"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("@/helpper");
const file_service_1 = __importDefault(require("@/service/file.service"));
class FileController {
    async createNewBlog(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create file',
            httpCode: 201,
            metadata: await file_service_1.default.createFile(req.body)
        }).send(res);
    }
    async getAllFiles(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create file',
            httpCode: 201,
            metadata: await file_service_1.default.getAllFile()
        }).send(res);
    }
    async getFileById(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create file',
            httpCode: 201,
            metadata: await file_service_1.default.getFileById(req.params.id)
        }).send(res);
    }
    async deleteFile(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create file',
            httpCode: 201,
            metadata: await file_service_1.default.deleteFile(req.params.id)
        }).send(res);
    }
    async updateFile(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create file',
            httpCode: 201,
            metadata: await file_service_1.default.uploadFilePdf(req)
        }).send(res);
    }
    async updateCoverImage(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create file',
            httpCode: 201,
            metadata: await file_service_1.default.uploadCoverImage(req)
        }).send(res);
    }
}
exports.default = new FileController();
