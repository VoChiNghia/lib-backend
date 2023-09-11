"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("@/helpper");
const user_service_1 = __importDefault(require("@/service/user.service"));
class UserController {
    async getUser(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get user successfully',
            metadata: await user_service_1.default.getUser(req.user.id)
        }).send(res);
    }
    async getAllUser(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get user successfully',
            metadata: await user_service_1.default.getAllUser()
        }).send(res);
    }
    async updateUser(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get user successfully',
            metadata: await user_service_1.default.updateUser(req.user.id, req.body)
        }).send(res);
    }
    async updateUserById(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get user successfully',
            metadata: await user_service_1.default.updateUser(req.params.id, req.body)
        }).send(res);
    }
    async updatePassword(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get user successfully',
            metadata: await user_service_1.default.updatePassword(req.user.id, req.body)
        }).send(res);
    }
    async deleteUser(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Get user successfully',
            metadata: await user_service_1.default.deleteUser(req.params.id)
        }).send(res);
    }
}
exports.default = new UserController();
