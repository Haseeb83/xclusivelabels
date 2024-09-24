"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDUUIDSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = __importDefault(require("zod"));
exports.ZODSCHEMA = zod_1.default.object({
    batch_uuid: zod_1.default.string(),
});
exports.IDUUIDSCHEMA = zod_1.default.object({
    id: zod_1.default.string(),
});
