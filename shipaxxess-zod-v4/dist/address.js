"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONEOPTIONALWITHUUIDSCHEMA = exports.ONLYPHONEOPTIONALSCHEMA = exports.PHONEOPTIONALSCHEMA = exports.WITHNAMESCHEMA = exports.UUIDSCHEMA = exports.IDZODSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    full_name: zod_1.z.string().min(1),
    company_name: zod_1.z.string().optional(),
    street_one: zod_1.z.string().min(1),
    street_two: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1),
    zip: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    phone: zod_1.z.string(),
    country: zod_1.z.string().default("United States"),
});
exports.IDZODSCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ id: zod_1.z.number() }));
exports.UUIDSCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ uuid: zod_1.z.string() }));
exports.WITHNAMESCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ name: zod_1.z.string() }));
exports.PHONEOPTIONALSCHEMA = exports.WITHNAMESCHEMA.merge(zod_1.z.object({ phone: zod_1.z.string().optional() }));
exports.ONLYPHONEOPTIONALSCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ phone: zod_1.z.string().optional() }));
exports.PHONEOPTIONALWITHUUIDSCHEMA = exports.PHONEOPTIONALSCHEMA.merge(zod_1.z.object({ uuid: zod_1.z.string() }));
