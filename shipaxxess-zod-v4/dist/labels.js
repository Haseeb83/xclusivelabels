"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEARCHZODSCHEMA = exports.BATCHZODSCHEMA = exports.RECIPIENTSCHEMAARRAY = exports.ZODSCHEMA = exports.COMMONSCHEMA = void 0;
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var zod_1 = require("zod");
var Address = __importStar(require("./address"));
var Package = __importStar(require("./package"));
var Type = __importStar(require("./type"));
exports.COMMONSCHEMA = zod_1.z.object({
    sender: Address.ZODSCHEMA,
    sender_select: zod_1.z.string().optional(),
    package: Package.IDOPTIONAL,
    package_select: zod_1.z.string().optional(),
    type: Type.IDZODSCHEMA,
    type_select: zod_1.z.string().optional(),
    shippingdate: zod_1.z
        .string()
        .transform(function (val) {
        return (0, moment_timezone_1.default)(val).format("MM/DD/YYYY");
    })
        .optional(),
    reference1: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    saturday: zod_1.z.boolean().optional(),
    signature: zod_1.z.boolean().optional(),
    name: zod_1.z.string().optional(),
    saved_sender: zod_1.z.boolean().default(false),
});
exports.ZODSCHEMA = exports.COMMONSCHEMA.merge(zod_1.z.object({
    recipient: Address.ZODSCHEMA,
}));
exports.RECIPIENTSCHEMAARRAY = zod_1.z
    .array(Address.ZODSCHEMA.merge(zod_1.z.object({ uuid: zod_1.z.string().uuid(), phone: zod_1.z.string().optional() })))
    .min(1);
exports.BATCHZODSCHEMA = exports.COMMONSCHEMA.merge(zod_1.z.object({
    batch_uuid: zod_1.z.string().uuid(),
    recipient: exports.RECIPIENTSCHEMAARRAY,
}));
exports.SEARCHZODSCHEMA = zod_1.z.object({
    uuid: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    weight: zod_1.z.string().optional(),
    delivery_id: zod_1.z.string().optional(),
    weight_unit_query: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    from_date: zod_1.z.date().optional(),
    end_date: zod_1.z.date().optional(),
    search_type: zod_1.z.enum(["label", "batch"]),
});
