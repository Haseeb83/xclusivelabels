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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weights = exports.Verify = exports.Type = exports.Tickets = exports.Signup = exports.Signin = exports.Settings = exports.Refund = exports.Payment = exports.Package = exports.Labels = exports.Id = exports.Forget = exports.Costs = exports.Chats = exports.Address = void 0;
var Address = __importStar(require("./address"));
exports.Address = Address;
var Chats = __importStar(require("./chats"));
exports.Chats = Chats;
var Costs = __importStar(require("./costs"));
exports.Costs = Costs;
var Forget = __importStar(require("./forget"));
exports.Forget = Forget;
var Id = __importStar(require("./id"));
exports.Id = Id;
var Labels = __importStar(require("./labels"));
exports.Labels = Labels;
var Package = __importStar(require("./package"));
exports.Package = Package;
var Payment = __importStar(require("./payment"));
exports.Payment = Payment;
var Refund = __importStar(require("./refund"));
exports.Refund = Refund;
var Settings = __importStar(require("./settings"));
exports.Settings = Settings;
var Signin = __importStar(require("./signin"));
exports.Signin = Signin;
var Signup = __importStar(require("./signup"));
exports.Signup = Signup;
var Tickets = __importStar(require("./tickets"));
exports.Tickets = Tickets;
var Type = __importStar(require("./type"));
exports.Type = Type;
var Verify = __importStar(require("./verify"));
exports.Verify = Verify;
var Weights = __importStar(require("./weights"));
exports.Weights = Weights;
