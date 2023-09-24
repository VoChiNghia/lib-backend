"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("@/helpper");
const borrowBook_service_1 = __importDefault(require("@/service/borrowBook.service"));
class CategoryController {
    async createNewTicketBorrow(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Create ticket borrow successfully',
            metadata: await borrowBook_service_1.default.createNewTicketBorrow(req.user.id, req.body)
        }).send(res);
    }
    async deleteTicketBorrow(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'delete successfully',
            metadata: await borrowBook_service_1.default.deleteTicketBorrow(req.params.id)
        }).send(res);
    }
    async updateStatusTicket(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'successfully',
            metadata: await borrowBook_service_1.default.updateStatusTicket(req.body.id, req.body.status)
        }).send(res);
    }
    async getAllBorrowBook(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'successfully',
            metadata: await borrowBook_service_1.default.getAllTicketBorrow()
        }).send(res);
    }
    async getBorrowBookByUser(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'successfully',
            metadata: await borrowBook_service_1.default.getBorrowBookByUser(req.user.id)
        }).send(res);
    }
    async getBorrowedBooksByMonth(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'successfully',
            metadata: await borrowBook_service_1.default.getBorrowedBooksByMonth()
        }).send(res);
    }
}
exports.default = new CategoryController();
