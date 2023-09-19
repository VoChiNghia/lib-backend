"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils");
const category_controller_1 = __importDefault(require("../../controllers/category.controller"));
const router = express_1.default.Router();
router.get('/category', (0, utils_1.asyncHandler)(category_controller_1.default.getAllCategory));
//router.use(authentication)
router.post('/category', (0, utils_1.asyncHandler)(category_controller_1.default.createNewBook));
router.delete('/category', (0, utils_1.asyncHandler)(category_controller_1.default.deleteCategory));
exports.default = router;
