"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("@/models/user.model"));
const auth_1 = require("@/middlewares/auth");
const utils_1 = require("@/utils");
const helpper_1 = require("@/helpper");
const repository_1 = require("@/models/repository");
const auth_2 = require("@/middlewares/auth");
const token_model_1 = __importDefault(require("@/models/token.model"));
const logs_1 = __importDefault(require("@/logs"));
const nodemailer_1 = __importDefault(require("@/nodemailer"));
const contentResponse_1 = __importDefault(require("@/nodemailer/contentResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async signUp(token) {
        const decode = await jsonwebtoken_1.default.verify(token, 'nghia');
        const newUser = await (0, utils_1.createModel)(user_model_1.default, {
            name: decode.name,
            email: decode.email,
            password: decode.password,
            phoneNumber: decode.phoneNumber,
        });
        if (!newUser)
            throw new helpper_1.BadRequest('register fail');
        return 'register successfully';
    }
    static async sendEmailVerify({ name, email, password, phoneNumber }) {
        const findUserByEmail = await user_model_1.default.findOne({ email });
        if (findUserByEmail)
            throw new helpper_1.BadRequest('User registered');
        const hashPass = await (0, auth_1.hashPassword)(password);
        const user = {
            name: name,
            email: email,
            password: hashPass,
            phoneNumber: phoneNumber
        };
        const token = await jsonwebtoken_1.default.sign(user, 'nghia', { expiresIn: '10m' });
        const info = await nodemailer_1.default.sendMail({
            from: 'Library-management-system',
            to: email,
            subject: 'Verify password',
            text: 'Hello world?',
            html: (0, contentResponse_1.default)(email, name, password, token)
        }, (err, response) => {
            if (err) {
                logs_1.default.error('some thing wrong when send email');
            }
            return response.response;
        });
        return info;
    }
    static async signIn({ email, password }) {
        const findUser = await (0, repository_1.findUserByEmail)(email);
        if (!findUser)
            throw new helpper_1.BadRequest('User not found');
        if (findUser && (await findUser.isPasswordMatched(password))) {
            const { publicKey, privateKey } = (0, auth_2.generateKeyPair)();
            const { accessToken, refreshToken } = await (0, auth_1.generateToken)({ id: findUser._id, email: findUser.email }, privateKey);
            const newTokenModel = await token_model_1.default.findOneAndUpdate({ userId: findUser._id }, {
                accessToken,
                refreshToken,
                userId: findUser._id,
                publicKey: publicKey,
                privateKey: privateKey
            }, {
                upsert: true,
                new: true
            });
            if (!newTokenModel) {
                logs_1.default.error('Create token model failed');
                throw new helpper_1.BadRequest('some thing error when save token');
            }
            return {
                user: (0, utils_1.getUserInfo)(findUser),
                token: { accessToken, refreshToken }
            };
        }
        else {
            throw new helpper_1.BadRequest('Password invalid');
        }
    }
    static async handleRefreshToken(user, refreshToken, keyStore) {
        const { id, email } = user;
        const findRefreshTokenUsed = await token_model_1.default.findOne({
            refreshTokenUsed: { $in: [refreshToken] }
        });
        if (findRefreshTokenUsed) {
            logs_1.default.error('user use token expired');
            await token_model_1.default.findByIdAndDelete(keyStore._id);
            throw new helpper_1.Forbidden('user forbidden');
        }
        if (keyStore.refreshToken !== refreshToken)
            throw new helpper_1.BadRequest('Refresh token invalid');
        const tokens = await (0, auth_1.generateToken)({ id, email }, keyStore.privateKey);
        const newToken = await token_model_1.default.findOneAndUpdate({ userId: id }, {
            $push: {
                refreshTokenUsed: refreshToken
            },
            $set: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        }, {
            new: true
        });
        return {
            user: id,
            token: tokens
        };
    }
}
_a = AuthService;
AuthService.logout = async (id) => {
    const del = await token_model_1.default.findOneAndDelete({ userId: id });
    return {
        del
    };
};
exports.default = AuthService;
