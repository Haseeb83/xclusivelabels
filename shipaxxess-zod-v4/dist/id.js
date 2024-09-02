"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    id: zod_1.z.number(),
});
exports.UUIDSCHEMA = zod_1.z.object({
    uuid: zod_1.z.string(),
});
