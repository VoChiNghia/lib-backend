"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("@/utils");
const auth_1 = require("@/middlewares/auth");
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const http_1 = __importDefault(require("http"));
const socketIo = __importStar(require("socket.io"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = socketIo(server);
const router = express_1.default.Router();
router.use(auth_1.authentication);
router.get('/user', (0, utils_1.asyncHandler)(user_controller_1.default.getUser));
router.put('/user/password', (0, utils_1.asyncHandler)(user_controller_1.default.updatePassword));
//router.use(isAdmin)
router.get('/all-user', (0, utils_1.asyncHandler)(user_controller_1.default.getAllUser));
router.put('/user', (0, utils_1.asyncHandler)(user_controller_1.default.updateUser));
router.put('/user/:id', (0, utils_1.asyncHandler)(user_controller_1.default.updateUser));
router.delete('/user/:id', (0, utils_1.asyncHandler)(user_controller_1.default.deleteUser));
router.post('/user//send-notification', (req, res) => {
    const { message, users } = req.body;
    if (users === 'all') {
        // Gửi thông báo đến tất cả người dùng
        io.emit('notification', message);
    }
    else {
        // Gửi thông báo đến người dùng chỉ định
        users.forEach((user) => {
            io.to(user).emit('notification', message);
        });
    }
    res.send('Notification sent');
});
// Socket.io kết nối
io.on('connection', (socket) => {
    const userId = socket.id;
    connectedUsers.add(userId);
    socket.on('disconnect', () => {
        connectedUsers.delete(userId);
    });
    socket.join(userId);
});
exports.default = router;
