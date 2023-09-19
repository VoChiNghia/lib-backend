"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("../helpper");
const category_model_1 = __importDefault(require("../models/category.model"));
const utils_1 = require("../utils");
class CategoryService {
    static async createCategory(body) {
        try {
            const addCategory = await (0, utils_1.createModel)(category_model_1.default, body);
            return addCategory;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async deleteCategory(id) {
        (0, utils_1.validateObjectId)(id);
        try {
            const delCate = await category_model_1.default.findByIdAndDelete(id);
            if (!delCate)
                throw new helpper_1.BadRequest('Category not found');
            return delCate;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getAllCategory() {
        try {
            const getAllCategory = await category_model_1.default.find().select('-__v');
            return getAllCategory;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = CategoryService;
