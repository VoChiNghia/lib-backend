"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authentication = exports.generateToken = exports.generateKeyPair = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpper_1 = require("../helpper");
const token_model_1 = __importDefault(require("../models/token.model"));
const constant_1 = require("../constant");
const utils_1 = require("../utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    return { publicKey, privateKey };
};
exports.generateKeyPair = generateKeyPair;
const generateToken = async (payload, privateKey) => {
    const accessToken = await jsonwebtoken_1.default.sign(payload, privateKey, {
        expiresIn: '3 days',
        algorithm: 'RS256'
    });
    const refreshToken = await jsonwebtoken_1.default.sign(payload, privateKey, {
        expiresIn: '7 days',
        algorithm: 'RS256'
    });
    return { accessToken, refreshToken };
};
exports.generateToken = generateToken;
const verifyToken = async (token, publicKey) => {
    if (!publicKey)
        throw new helpper_1.BadRequest('something wrong');
    return await jsonwebtoken_1.default.verify(token, publicKey);
};
const authentication = (0, utils_1.asyncHandler)(async (req, res, next) => {
    const userId = req.headers[constant_1.HEADERS.CLIENT_ID];
    if (!userId)
        throw new helpper_1.BadRequest('Invalid client id');
    const keyStore = await token_model_1.default.findOne({ userId });
    if (!keyStore)
        throw new helpper_1.Forbidden('User forbidden');
    const refreshToken = req.headers[constant_1.HEADERS.REFRESH_TOKEN];
    if (refreshToken) {
        const decode = await verifyToken(refreshToken, keyStore.publicKey);
        req.keyStore = keyStore;
        req.user = {
            id: decode.id,
            email: decode.email
        };
        req.refreshToken = refreshToken;
        return next();
    }
    const accessToken = req.headers[constant_1.HEADERS.AUTHENTICATION];
    if (!accessToken)
        throw new helpper_1.Forbidden('User forbidden');
    const decode = await verifyToken(accessToken, keyStore.publicKey);
    req.keyStore = keyStore;
    req.user = {
        id: decode.id,
        email: decode.email
    };
    return next();
});
exports.authentication = authentication;
const isAdmin = (0, utils_1.asyncHandler)(async (req, res, next) => {
    const userId = req.headers[constant_1.HEADERS.CLIENT_ID];
    if (!userId)
        throw new helpper_1.BadRequest('Invalid client id');
    const findUser = await user_model_1.default.findById({ _id: userId });
    if (!findUser)
        throw new helpper_1.BadRequest('User not found');
    console.log(findUser.role);
    if (findUser.role !== 'admin')
        throw new helpper_1.Forbidden('User forbidden');
    next();
});
exports.isAdmin = isAdmin;
