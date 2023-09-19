"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("../helpper");
const logs_1 = __importDefault(require("../logs"));
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const book_model_1 = __importDefault(require("../models/book.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const utils_1 = require("../utils");
const fs_1 = __importDefault(require("fs"));
class BookService {
    static async createNewBook(body) {
        try {
            const foundBook = await book_model_1.default.findOne({ name: body.name });
            if (foundBook)
                throw new helpper_1.BadRequest('Book code already exist');
            const categoryId = (0, utils_1.validateObjectId)(body.category) ? body.category : null;
            const category = await category_model_1.default.findById(categoryId);
            if (!category)
                throw new helpper_1.BadRequest('category not found');
            console.log({
                _id: category._id,
                name: category.name
            });
            const addNewBook = await (0, utils_1.createModel)(book_model_1.default, {
                ...body,
                category: {
                    _id: category._id,
                    name: category.name
                }
            });
            console.log(addNewBook);
            if (addNewBook)
                return addNewBook;
        }
        catch (error) {
            logs_1.default.error('error when create new book');
            throw new Error(error);
        }
    }
    static async updateBook(bookId, body) {
        (0, utils_1.validateObjectId)(bookId);
        const findBook = await book_model_1.default.findById(bookId);
        if (!findBook)
            throw new helpper_1.BadRequest('Book Not found');
        const updateBook = await book_model_1.default.findByIdAndUpdate({ _id: bookId }, body, {
            new: true
        });
        if (!updateBook)
            throw new helpper_1.BadRequest('update fail');
        return {
            message: 'update successfully'
        };
    }
    static async deleteBook(bookId) {
        (0, utils_1.validateObjectId)(bookId);
        const findBook = await book_model_1.default.findById(bookId);
        if (!findBook)
            throw new helpper_1.BadRequest('Book Not found');
        const deleteBook = await book_model_1.default.findByIdAndDelete(bookId);
        if (!deleteBook)
            throw new helpper_1.BadRequest('some thing wrong');
        return deleteBook;
    }
    static async getBook(bookId) {
        (0, utils_1.validateObjectId)(bookId);
        const objectId = (0, utils_1.convertStringToObjectId)(bookId);
        const getBook = await book_model_1.default
            .findById(objectId)
            .populate('category')
            .lean();
        if (!getBook)
            throw new helpper_1.BadRequest('some thing wrong');
        return getBook;
    }
    static async getAllBook(query) {
        const queryObj = { ...query };
        const totalDocument = await book_model_1.default.countDocuments();
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((field) => delete queryObj[field]);
        if (query.category) {
            delete queryObj['category'];
            queryObj['category.name'] = query.category;
        }
        if (query.name) {
            delete queryObj['name'];
            queryObj['name'] = query.name;
        }
        let queryBook = book_model_1.default.find(queryObj);
        // sort
        if (query.sort) {
            const sortBy = query.sort.split(',').join(' ');
            queryBook = queryBook.sort(sortBy);
        }
        else {
            queryBook = queryBook.sort('-createdAt');
        }
        //get fields
        if (query.fields) {
            const fields = query.fields.split(',').join(' ');
            queryBook = queryBook.select(fields);
        }
        else {
            queryBook = queryBook.select('-__v');
        }
        //pagination
        if (query.page && query.limit) {
            const skip = (query.page - 1) * query.limit;
            queryBook = queryBook.limit(query.limit).skip(skip);
            if (totalDocument <= skip)
                throw new helpper_1.BadRequest('this page dose not exist');
        }
        const allBook = await queryBook;
        if (!allBook)
            throw new helpper_1.BadRequest('some thing wrong');
        return {
            allBook,
            totalDocument
        };
    }
    static async uploadCoverImage(req) {
        const { id } = req.params;
        try {
            (0, cloudinary_1.default)(req.file.path)
                .then(async (uploadedImg) => {
                await book_model_1.default.findByIdAndUpdate(id, {
                    coverImage: uploadedImg?.url
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
    static async uploadCoverImageByBody(req) {
        const { name, author, publishingYear } = req.query;
        try {
            (0, cloudinary_1.default)(req.file.path)
                .then(async (uploadedImg) => {
                const findBook = await book_model_1.default.findOne({
                    name,
                    author,
                    publishingYear
                });
                if (findBook) {
                    findBook.coverImage = uploadedImg.url;
                    await findBook.save();
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
    static async uploadFilePdf(req) {
        const { id } = req.params;
        const currentUrl = req.protocol + '://' + req.get('host') + '/public/ebooks/' + req.file.filename;
        try {
            await book_model_1.default.findByIdAndUpdate(id, {
                format: {
                    linkPdf: currentUrl
                }
            }, { new: true });
            return {
                message: 'upload cover image successfully'
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = BookService;
