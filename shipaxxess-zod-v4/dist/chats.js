"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDZODSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = __importDefault(require("zod"));
exports.ZODSCHEMA = zod_1.default.object({
    message: zod_1.default.string(),
});
exports.IDZODSCHEMA = exports.ZODSCHEMA.merge(zod_1.default.object({ id: zod_1.default.number() }));
