"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpper_1 = require("../helpper");
const penalty_service_1 = __importDefault(require("../service/penalty.service"));
class PenaltyController {
    async createNewPenalty(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'create successfully',
            httpCode: 201,
            metadata: await penalty_service_1.default.createNewPenalty(req.body)
        }).send(res);
    }
    async getAll(req, res, next) {
        new helpper_1.SusscessResponse({
            message: 'successfully',
            httpCode: 201,
            metadata: await penalty_service_1.default.getAllPenalty()
        }).send(res);
    }
}
exports.default = new PenaltyController();
