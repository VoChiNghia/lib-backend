"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils");
const auth_1 = require("../../middlewares/auth");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.get('/user', (0, utils_1.asyncHandler)(user_controller_1.default.getUser));
router.put('/user/password', (0, utils_1.asyncHandler)(user_controller_1.default.updatePassword));
//router.use(isAdmin)
router.get('/all-user', (0, utils_1.asyncHandler)(user_controller_1.default.getAllUser));
router.put('/user', (0, utils_1.asyncHandler)(user_controller_1.default.updateUser));
router.put('/user/:id', (0, utils_1.asyncHandler)(user_controller_1.default.updateUser));
router.delete('/user/:id', (0, utils_1.asyncHandler)(user_controller_1.default.deleteUser));
exports.default = router;
