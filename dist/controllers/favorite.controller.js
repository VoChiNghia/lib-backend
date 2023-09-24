"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemFromListBooks = exports.deleteListItemListBook = exports.deleteListFavoriteByUser = exports.getAllListFavorite = exports.getListFavorite = exports.getListFavoriteByUser = exports.addBookToFavoriteReturn = exports.addBookToFavorite = exports.addFavoriteBook = void 0;
const helpper_1 = require("@/helpper");
const favorite_model_1 = __importDefault(require("@/models/favorite.model"));
const addFavoriteBook = async (req, res) => {
    const { prodId, user } = req.body;
    try {
        const findListFavorite = await favorite_model_1.default.findOne({ user: user });
        if (!findListFavorite) {
            const newList = await favorite_model_1.default.create({
                user: user,
                listBooks: [prodId]
            });
            res.json(newList);
        }
        else {
            const listBook = favorite_model_1.default.find({ user: user });
            const index = listBook.listBooks?.indexOf(prodId);
            if (index === -1) {
                findListFavorite.listBooks.push(prodId);
                res.json('added');
            }
            else {
                findListFavorite.listBooks[index] = prodId;
                res.json('added');
            }
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.addFavoriteBook = addFavoriteBook;
const addBookToFavorite = async (body) => {
    const { userId, bookId } = body;
    try {
        // Tìm một bản ghi FavoriteBook dựa trên userId
        const favoriteBook = await favorite_model_1.default.findOne({ user: userId });
        // Nếu không tìm thấy bản ghi, tạo một bản ghi mới
        if (!favoriteBook) {
            const newFavoriteBook = favorite_model_1.default.create({
                user: userId,
                listBooks: [bookId]
            });
            return { success: true, message: 'Sách đã được thêm vào danh sách yêu thích thành công' };
        }
        // Nếu tìm thấy bản ghi, kiểm tra xem bookId đã tồn tại trong listBooks chưa
        if (favoriteBook.listBooks.includes(bookId)) {
            return { success: false, message: 'Sách đã tồn tại trong danh sách yêu thích' };
        }
        // Nếu bookId chưa tồn tại trong listBooks, thêm nó vào
        favoriteBook.listBooks.push(bookId);
        await favoriteBook.save();
        return { success: true, message: 'Sách đã được thêm vào danh sách yêu thích thành công' };
    }
    catch (error) {
        return { success: false, message: 'Đã xảy ra lỗi khi thêm sách vào danh sách yêu thích' };
    }
};
exports.addBookToFavorite = addBookToFavorite;
const addBookToFavoriteReturn = async (req, res) => {
    new helpper_1.SusscessResponse({
        message: 'Successfully',
        httpCode: 201,
        metadata: await (0, exports.addBookToFavorite)(req.body)
    }).send(res);
};
exports.addBookToFavoriteReturn = addBookToFavoriteReturn;
const getListFavoriteByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const favoriteBook = await favorite_model_1.default.findOne({ user: id }).populate('listBooks');
        res.json(favoriteBook);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getListFavoriteByUser = getListFavoriteByUser;
const getListFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const getByUser = await favorite_model_1.default.findById(id);
        res.json(getByUser);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getListFavorite = getListFavorite;
const getAllListFavorite = async (req, res) => {
    try {
        const getAllListFavorite = await favorite_model_1.default
            .find()
            .populate('user')
            .populate({
            path: 'listBooks',
            model: 'Book'
        })
            .exec();
        res.json(getAllListFavorite);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllListFavorite = getAllListFavorite;
const deleteListFavoriteByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteListFavoriteByUser = await favorite_model_1.default.findOneAndDelete({
            user: id
        });
        res.json(deleteListFavoriteByUser);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.deleteListFavoriteByUser = deleteListFavoriteByUser;
const deleteListItemListBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteListFavoriteByUser = await favorite_model_1.default.findOne({
            user: id
        });
        res.json(deleteListFavoriteByUser);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.deleteListItemListBook = deleteListItemListBook;
const deleteItemFromListBooks = async (req, res) => {
    const { _id, userId } = req.body;
    try {
        // Tìm dữ liệu của người dùng với userId
        const favoriteBook = await favorite_model_1.default.findOne({ user: userId });
        if (!favoriteBook) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        const updatedListBooks = favoriteBook.listBooks.filter((bookId) => !bookId.equals(_id));
        console.log(updatedListBooks);
        // Cập nhật listBooks mới
        favoriteBook.listBooks = updatedListBooks;
        // Lưu thay đổi vào cơ sở dữ liệu
        await favoriteBook.save();
        return res.status(200).json({ message: 'Xóa mục thành công' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Lỗi server' });
    }
};
exports.deleteItemFromListBooks = deleteItemFromListBooks;
