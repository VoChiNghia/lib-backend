"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../config/index"));
const connectString = `${index_1.default.mongodb.host}${index_1.default.mongodb.name}:${index_1.default.mongodb.password}@cluster0.ke33mky.mongodb.net/`;
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        mongoose_1.default
            .connect('mongodb+srv://nghiakg114321:nghiakg114321@cluster1.ezyaajy.mongodb.net/')
            .then(() => {
            console.log('database connected');
        })
            .catch((error) => console.log(error));
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
exports.default = Database;
