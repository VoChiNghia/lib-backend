"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("../helpper");
const auth_1 = require("../middlewares/auth");
const user_repo_1 = require("../models/repository/user.repo");
const user_model_1 = __importDefault(require("../models/user.model"));
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static async getUser(id) {
        const getUser = await (0, user_repo_1.findUser)({ _id: id }, '-password -createdAt -updatedAt');
        if (!getUser)
            throw new helpper_1.BadRequest('User not found');
        return {
            user: getUser
        };
    }
    static async getAllUser() {
        const AllUser = await (0, user_repo_1.findAllUser)('-password -createdAt -updatedAt');
        const totalUsers = await user_model_1.default.countDocuments();
        if (!AllUser)
            throw new helpper_1.BadRequest('some thing error');
        return {
            user: AllUser,
            totalUsers
        };
    }
    static async updateUser(id, body) {
        if (!(0, utils_1.validateObjectId)(id)) {
            const hashPass = await (0, auth_1.hashPassword)('12345678');
            await user_model_1.default.create({
                ...body,
                password: hashPass
            });
            return 'user created';
        }
        else {
            const getUser = await (0, user_repo_1.findUser)({ _id: id });
            if (!getUser)
                throw new Error("Không tìm thấy người dùng");
            const query = { _id: id };
            const update = body;
            const option = {
                new: true
            };
            const updateUser = await user_model_1.default.findOneAndUpdate(query, update, option);
            return 'user updated';
        }
    }
    static async updatePassword(id, { password, currentPassword, confirmPassword }) {
        const getUser = await user_model_1.default.findOne({ _id: id });
        if (!getUser)
            throw new helpper_1.BadRequest('User not found');
        if (!(await bcrypt_1.default.compare(currentPassword, getUser.password)))
            throw new helpper_1.BadRequest('Mật khẩu hiện tại không đúng');
        if (String(password) !== String(confirmPassword))
            throw new helpper_1.BadRequest('Nhập lại mật khẩu chưa đúng');
        const hashPass = await (0, auth_1.hashPassword)(password);
        const query = { _id: id };
        const update = {
            $set: { password: hashPass }
        };
        const option = {
            new: true
        };
        const setPassword = await user_model_1.default.findOneAndUpdate(query, update, option);
        return (0, utils_1.getUserInfo)(setPassword);
    }
    static async deleteUser(id) {
        const del = await user_model_1.default.findOneAndDelete({ _id: id });
        if (!del)
            throw new helpper_1.BadRequest('delete failed');
        return {
            userDeleted: del
        };
    }
}
exports.default = UserService;
