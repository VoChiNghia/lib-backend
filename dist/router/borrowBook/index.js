"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("@/utils");
const auth_1 = require("@/middlewares/auth");
const borrow_controller_1 = __importDefault(require("@/controllers/borrow.controller"));
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.put('/borrow/update-status', (0, utils_1.asyncHandler)(borrow_controller_1.default.updateStatusTicket));
router.put('/borrow/123', (0, utils_1.asyncHandler)(borrow_controller_1.default.updateStatusTicket));
router.get('/borrow', (0, utils_1.asyncHandler)(borrow_controller_1.default.getAllBorrowBook));
router.get('/borrow-statistical', (0, utils_1.asyncHandler)(borrow_controller_1.default.getBorrowedBooksByMonth));
router.get('/borrow-user', (0, utils_1.asyncHandler)(borrow_controller_1.default.getBorrowBookByUser));
router.post('/borrow', (0, utils_1.asyncHandler)(borrow_controller_1.default.createNewTicketBorrow));
router.delete('/borrow/:id', (0, utils_1.asyncHandler)(borrow_controller_1.default.deleteTicketBorrow));
exports.default = router;
