"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTMESSAGE = exports.IDZODSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    title: zod_1.z.string().min(2),
    type: zod_1.z.string().min(1),
    content: zod_1.z.string().min(2),
    data_id: zod_1.z.string().optional(),
});
exports.IDZODSCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ id: zod_1.z.number() }));
exports.POSTMESSAGE = zod_1.z.object({
    id: zod_1.z.number(),
    message: zod_1.z.string(),
    author: zod_1.z.string(),
    message_profile: zod_1.z.string().max(2),
});
