"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("../helpper");
const category_service_1 = __importDefault(require("../service/category.service"));
class CategoryController {
    async createNewBook(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Create category successfully',
            metadata: await category_service_1.default.createCategory(req.body)
        }).send(res);
    }
    async deleteCategory(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Create category successfully',
            metadata: await category_service_1.default.deleteCategory(req.params.id)
        }).send(res);
    }
    async getAllCategory(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'Create category successfully',
            metadata: await category_service_1.default.getAllCategory()
        }).send(res);
    }
}
exports.default = new CategoryController();
