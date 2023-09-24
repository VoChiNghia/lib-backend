"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("@/controllers/auth.controller"));
const utils_1 = require("@/utils");
const auth_1 = require("@/middlewares/auth");
const auth_service_1 = __importDefault(require("@/service/auth.service"));
const router = express_1.default.Router();
router.post('/auth/forgot-password', (0, utils_1.asyncHandler)(auth_controller_1.default.forgotPassword));
router.post('/auth/signup', (0, utils_1.asyncHandler)(auth_controller_1.default.sendEmailVerify));
router.post('/auth/signin', (0, utils_1.asyncHandler)(auth_controller_1.default.signIn));
router.delete('/auth/logout/:id', (0, utils_1.asyncHandler)(auth_controller_1.default.logout));
router.get('/auth/:token', (0, utils_1.asyncHandler)(auth_service_1.default.signUp));
router.use(auth_1.authentication);
router.post('/auth/refresh-token', (0, utils_1.asyncHandler)(auth_controller_1.default.handleRefreshToken));
exports.default = router;
