"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZODSCHEMA = void 0;
var zod_1 = require("zod");
exports.ZODSCHEMA = zod_1.z.object({
    email_address: zod_1.z.string().email(),
});
