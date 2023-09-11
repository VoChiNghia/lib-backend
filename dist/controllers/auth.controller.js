"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("@/helpper");
const auth_service_1 = __importDefault(require("@/service/auth.service"));
class AuthController {
    async sendEmailVerify(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'email is pending',
            httpCode: 201,
            metadata: await auth_service_1.default.sendEmailVerify(req.body)
        }).send(res);
    }
    async signUp(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Created',
            httpCode: 201,
            metadata: await auth_service_1.default.signUp(req.params.token)
        }).send(res);
    }
    async signIn(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'SignIn successfully',
            metadata: await auth_service_1.default.signIn(req.body)
        }).send(res);
    }
    async logout(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Logout successfully',
            metadata: await auth_service_1.default.logout(req.params.id)
        }).send(res);
    }
    async handleRefreshToken(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'SignIn successfully',
            metadata: await auth_service_1.default.handleRefreshToken(req.user, req.refreshToken, req.keyStore)
        }).send(res);
    }
}
exports.default = new AuthController();
