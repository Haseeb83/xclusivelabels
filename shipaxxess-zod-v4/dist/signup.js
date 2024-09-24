"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    first_name: zod_1.z.string().min(1),
    last_name: zod_1.z.string().min(1),
    email_address: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    refer_from: zod_1.z.string().optional(),
});
