"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZODSCHEMA = void 0;
var zod_1 = __importDefault(require("zod"));
exports.ZODSCHEMA = zod_1.default.object({
    email_address: zod_1.default.string().email(),
    code: zod_1.default.string(),
    type: zod_1.default.enum(["email_verification", "reset", "two_fa"]),
});
