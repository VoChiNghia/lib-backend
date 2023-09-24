"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("@/middlewares/auth");
const requestBook_controller_1 = require("@/controllers/requestBook.controller");
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.post('/request-book', requestBook_controller_1.createRequestBook);
router.get('/request-book', requestBook_controller_1.getAllRequestBook);
router.get('/request-book/:id', requestBook_controller_1.getRequestBook);
// router.get('/:id', getListFavorite)
router.delete('/request-book/:id', requestBook_controller_1.deleteRequestBook);
exports.default = router;
