"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequestBook = exports.getRequestBook = exports.deleteRequestBook = exports.createRequestBook = void 0;
const requestBook_model_1 = __importDefault(require("../models/requestBook.model"));
const createRequestBook = async (req, res) => {
    const { id } = req.user;
    try {
        const newRequestBook = await requestBook_model_1.default.create({
            ...req.body,
            user: id
        });
        res.json(newRequestBook);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createRequestBook = createRequestBook;
const deleteRequestBook = async (req, res) => {
    const { id } = req.params;
    try {
        const updateRequestBook = await requestBook_model_1.default.findByIdAndDelete(id);
        res.json(updateRequestBook);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.deleteRequestBook = deleteRequestBook;
const getRequestBook = async (req, res) => {
    const { id } = req.params;
    try {
        const getRequestBook = await requestBook_model_1.default.findById(id).populate({
            path: 'user',
            select: '-password -citizenNumber -role'
        });
        res.json(getRequestBook);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getRequestBook = getRequestBook;
const getAllRequestBook = async (req, res) => {
    try {
        const getAllRequestBook = await requestBook_model_1.default.find().populate('user');
        res.json(getAllRequestBook);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllRequestBook = getAllRequestBook;
