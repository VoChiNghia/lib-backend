"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favorite_controller_1 = require("../../controllers/favorite.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.post('/favorite', favorite_controller_1.addBookToFavoriteReturn);
// router.post('/favorite', addFavoriteBook)
router.get('/favorite', favorite_controller_1.getAllListFavorite);
router.post('/favorite/delete-item-list-book', favorite_controller_1.deleteItemFromListBooks);
router.get('/favorite-user/:id', favorite_controller_1.getListFavoriteByUser);
router.get('/favorite/:id', favorite_controller_1.getListFavorite);
router.delete('favorite/:id', favorite_controller_1.deleteListFavoriteByUser);
exports.default = router;
