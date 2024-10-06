"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDITSCHEMA = exports.CREATESCHEMA = exports.IDZODSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    label: zod_1.z.string(),
    value: zod_1.z.string(),
    unit: zod_1.z.enum(["oz", "lb"]),
    type: zod_1.z.enum(["usps", "ups", "fedex"]),
});
exports.IDZODSCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ id: zod_1.z.number() }));
exports.CREATESCHEMA = zod_1.z.object({
    label: zod_1.z.string(),
    value: zod_1.z.string(),
    unit: zod_1.z.enum(["oz", "lb"]),
    type: zod_1.z.enum(["usps", "ups", "fedex"]),
});
exports.EDITSCHEMA = exports.CREATESCHEMA.merge(zod_1.z.object({ id: zod_1.z.number() }));