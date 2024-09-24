"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REJECTSCHEMA = exports.ACCEPTSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    gateway: zod_1.z.string(),
    credit: zod_1.z.coerce.number(),
});
exports.ACCEPTSCHEMA = zod_1.z.object({
    payment_id: zod_1.z.number(),
});
exports.REJECTSCHEMA = zod_1.z.object({
    payment_id: zod_1.z.number(),
});
