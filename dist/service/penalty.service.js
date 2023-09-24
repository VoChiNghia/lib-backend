"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const penalty_model_1 = __importDefault(require("@/models/penalty.model"));
class PenaltyService {
    static async createNewPenalty(body) {
        try {
            const penalty = await penalty_model_1.default.create(body);
            return penalty;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getAllPenalty() {
        try {
            const penalty = await penalty_model_1.default.find().populate('bookId').populate('userId');
            return penalty;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = PenaltyService;
