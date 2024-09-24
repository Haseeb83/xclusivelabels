"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDITSCHEMA = exports.CREATESCHEMA = exports.FETCHSCHEMA = void 0;
var zod_1 = require("zod");
exports.FETCHSCHEMA = zod_1.z.object({
    weight: zod_1.z.coerce.number().min(1),
    type_id: zod_1.z.number().min(1),
    type: zod_1.z.enum(["usps", "ups"]),
});
exports.CREATESCHEMA = zod_1.z.object({
    to_weight: zod_1.z.coerce.number().min(1),
    from_weight: zod_1.z.coerce.number().min(1),
    user_cost: zod_1.z.coerce.number(),
    reseller_cost: zod_1.z.coerce.number(),
    type_id: zod_1.z.string().min(1),
});
exports.EDITSCHEMA = exports.CREATESCHEMA.merge(zod_1.z.object({ id: zod_1.z.number() }));
