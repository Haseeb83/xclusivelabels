"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDZODSCHEMA = exports.IDOPTIONAL = exports.IDZODSCHEMA = exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    weight: zod_1.z.coerce.number().min(1),
    height: zod_1.z.coerce.number().min(1),
    width: zod_1.z.coerce.number().min(1),
    length: zod_1.z.coerce.number().min(1),
    name: zod_1.z.string(),
    radio: zod_1.z.string().optional(),
});
exports.IDZODSCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ id: zod_1.z.number() }));
exports.IDOPTIONAL = exports.ZODSCHEMA.merge(zod_1.z.object({ id: zod_1.z.number().optional() }));
exports.UUIDZODSCHEMA = exports.ZODSCHEMA.merge(zod_1.z.object({ uuid: zod_1.z.string().uuid() }));
