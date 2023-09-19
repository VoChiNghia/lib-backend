"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverImgProduct = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const utils_1 = require("../utils");
const multerStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, path_1.default.join(__dirname, '../../public/ebooks'));
        }
        else {
            cb(null, path_1.default.join(__dirname, '../../public/images'));
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    }
    else {
        cb(null, false); // Reject the file
    }
};
const coverImgProduct = (0, utils_1.asyncHandler)(async (req, res, next) => {
    if (!req.file)
        return next();
    await (0, sharp_1.default)(req.file.path)
        .resize(400, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/cover/${req.file.filename}`);
    req.file.path = path_1.default.join(__dirname, `../../public/images/cover/${req.file.filename}`);
    next();
});
exports.coverImgProduct = coverImgProduct;
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter
});
exports.upload = upload;
