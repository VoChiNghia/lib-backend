"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = exports.convertStringToObjectId = exports.getUserInfo = exports.getInforData = exports.createModel = exports.asyncHandler = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importDefault(require("mongoose"));
const helpper_1 = require("@/helpper");
const asyncHandler = (fn) => {
    return (req, res, next) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
const createModel = async (model, body = {}) => {
    return await model.create(body);
};
exports.createModel = createModel;
const getInforData = ({ fields = [], object = {} }) => {
    return lodash_1.default.pick(object, fields);
};
exports.getInforData = getInforData;
const convertStringToObjectId = (id) => {
    return new mongoose_1.default.Types.ObjectId(id);
};
exports.convertStringToObjectId = convertStringToObjectId;
function validateObjectId(id) {
    try {
        return mongoose_1.default.Types.ObjectId.isValid(id);
    }
    catch (error) {
        throw new helpper_1.BadRequest('wrong ObjectId');
    }
}
exports.validateObjectId = validateObjectId;
const getUserInfo = (user) => {
    const defaultFields = ['_id', 'name', 'email', 'phoneNumber', 'role'];
    return getInforData({
        fields: defaultFields,
        object: user
    });
};
exports.getUserInfo = getUserInfo;
