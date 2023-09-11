"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("@/helpper");
const logs_1 = __importDefault(require("@/logs"));
const borrowBook_model_1 = __importDefault(require("@/models/borrowBook.model"));
const utils_1 = require("@/utils");
class BorrowBookService {
    static async createNewTicketBorrow(id, body) {
        const findBorrowBook = await borrowBook_model_1.default.findOne({
            userId: id,
            bookId: body.bookId
        });
        if (findBorrowBook)
            throw new helpper_1.BadRequest('this book already borrowed');
        try {
            const borrowBook = await (0, utils_1.createModel)(borrowBook_model_1.default, {
                ...body,
                userId: id
            });
            return borrowBook;
        }
        catch (error) {
            logs_1.default.error(error.message);
            throw new helpper_1.BadRequest(error);
        }
    }
    static async deleteTicketBorrow(id) {
        (0, utils_1.validateObjectId)(id);
        const del = await borrowBook_model_1.default.findByIdAndDelete(id);
        if (!del)
            throw new helpper_1.BadRequest('not book borrow');
        return del;
    }
    static async getAllTicketBorrow() {
        const getAll = await borrowBook_model_1.default.find().populate('userId').populate('bookId');
        if (!getAll)
            throw new helpper_1.BadRequest('not book borrow');
        return getAll;
    }
    static async getBorrowBookByUser(userId) {
        const getAll = await borrowBook_model_1.default.find({ "userId._id": userId }).populate('userId').populate('bookId');
        if (!getAll)
            throw new helpper_1.BadRequest('not book borrow');
        return getAll;
    }
    static async updateStatusTicket(id, status) {
        (0, utils_1.validateObjectId)(id);
        const foundTicketBorrow = await borrowBook_model_1.default.findById(id);
        if (!foundTicketBorrow)
            throw new helpper_1.BadRequest('not found book borrow');
        foundTicketBorrow.status = status;
        await foundTicketBorrow.save();
        return foundTicketBorrow;
    }
}
exports.default = BorrowBookService;
