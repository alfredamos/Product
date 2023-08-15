"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const loginValidationSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required(),
});
const userLoginValidation = (loginModel) => {
    const { email, password } = loginModel;
    return loginValidationSchema.validate({ email, password }, { abortEarly: false });
};
exports.userLoginValidation = userLoginValidation;
