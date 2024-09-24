"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    reseller_cost: zod_1.z.number(),
    user_cost: zod_1.z.number(),
});
