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
    // static async signUp(token: string) {
    //   const decode: any = await jwt.verify(token, 'nghia')
    //   const newUser = await createModel(userModel,{
    //     name: decode.name,
    //     email: decode.email,
    //     password: decode.password,
    //     phoneNumber: decode.phoneNumber,
    //   })
    //   if (!newUser) throw new BadRequest('register fail')
    //   return ` <!DOCTYPE html>
    //   <html>
    //     <head>
    //       <title>Trang chủ</title>
    //     </head>
    //     <body>
    //       <h1>Đăng ký tài khoản thành công!</h1>
    //     </body>
    //   </html>`
    // }
    static async signUp(req, res) {
        const decode = await jsonwebtoken_1.default.verify(req.params.token, 'nghia');
        const newUser = await (0, utils_1.createModel)(user_model_1.default, {
            name: decode.name,
            email: decode.email,
            password: decode.password,
            phoneNumber: decode.phoneNumber
        });
        if (!newUser)
            throw new helpper_1.BadRequest('register fail');
        res.send(` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đăng ký tài khoản thành công</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            
            .container {
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: 1px solid orangered;
            }
            
            .success-icon {
                color: #28a745;
                font-size: 48px;
            }
            
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            
            p {
                font-size: 18px;
                margin-bottom: 20px;
            }
            
            a {
                text-decoration: none;
                color: #007bff;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <i class="fas fa-check-circle success-icon"></i>
            <h1>Đăng ký tài khoản thành công!</h1>
            <p>Tài khoản của bạn đã được tạo thành công.</p>
            <a href="https://donganlibrary.online">Đăng nhập</a>
        </div>
    </body>
    </html>`);
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
    static async forgotPassword(email) {
        console.log(email);
        const randomPassword = this.generateRandomPassword(8);
        // TODO: Lưu mật khẩu mới vào cơ sở dữ liệu cho tài khoản tương ứng với email
        const findUser = await user_model_1.default.findOne({ email });
        if (!findUser)
            throw new Error('Không tìm thấy user');
        const hashPass = await (0, auth_1.hashPassword)(randomPassword);
        await user_model_1.default.findOneAndUpdate({ email }, { password: hashPass });
        // Gửi email với mật khẩu mới
        nodemailer_1.default.sendMail({
            from: 'Library-management-system',
            to: email,
            subject: 'Password Reset',
            text: `Your new password is: ${randomPassword}`
        }, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return 'An error occurred while sending the email';
            }
            return 'Password reset email sent';
        });
        return 'success';
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
AuthService.generateRandomPassword = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
};
AuthService.logout = async (id) => {
    const del = await token_model_1.default.findOneAndDelete({ userId: id });
    return {
        del
    };
};
exports.default = AuthService;
