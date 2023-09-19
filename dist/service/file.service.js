"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logs_1 = __importDefault(require("../logs"));
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const file_model_1 = __importDefault(require("../models/file.model"));
const fs_1 = __importDefault(require("fs"));
class FileService {
    static async createFile(body) {
        const getFile = await file_model_1.default.find(body);
        console.log(getFile);
        if (getFile.length !== 0) {
            throw new Error("file đã tồn tại");
        }
        console.log(body);
        try {
            const newFile = await file_model_1.default.create(body);
            if (!newFile)
                throw new Error('Not found');
            return newFile;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getAllFile() {
        try {
            const getAll = await file_model_1.default.find();
            if (!getAll)
                throw new Error('Not found');
            return getAll;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getFileById(id) {
        try {
            const getAll = await file_model_1.default.findById(id);
            if (!getAll)
                throw new Error('Not found');
            return getAll;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async deleteFile(id) {
        const file = await file_model_1.default.findByIdAndDelete(id);
        if (!file) {
            throw new Error('Not found');
        }
        return file;
    }
    static async updateFile(id, body) {
        try {
            const updatedFile = await file_model_1.default.findByIdAndUpdate(id, body, { new: true });
            if (!updatedFile) {
                throw new Error('Not found');
            }
            return updatedFile;
        }
        catch (error) {
            throw new Error('error');
        }
    }
    static async searchFiles(req) {
        try {
            const { tenKhoa, tenMonHoc, giaovien } = req.query;
            const query = {};
            if (tenKhoa)
                query.tenKhoa = tenKhoa;
            if (tenMonHoc)
                query.tenMonHoc = tenMonHoc;
            if (giaovien)
                query.giaovien = giaovien;
            const files = await file_model_1.default.find(query);
            return files;
        }
        catch (error) {
            throw new Error('error');
        }
    }
    static async uploadFilePdf(req) {
        const currentUrl = req.protocol + '://' + req.get('host') + '/public/ebooks/' + req?.file?.filename;
        try {
            await file_model_1.default.findOneAndUpdate(req.query, {
                filePdf: currentUrl
            }, { new: true });
            return {
                message: 'upload cover image successfully'
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async uploadCoverImage(req) {
        const { id } = req.params;
        console.log(id);
        try {
            (0, cloudinary_1.default)(req.file.path)
                .then(async (uploadedImg) => {
                console.log(uploadedImg?.url);
                await file_model_1.default.findByIdAndUpdate(id, {
                    image: uploadedImg?.url
                }, { new: true });
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
exports.default = FileService;
