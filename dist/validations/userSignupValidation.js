"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userSignupValidationSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    name: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required(),
    gender: joi_1.default.optional(),
});
const userSignupValidation = (signupModel) => {
    const { name, email, phone, password, confirmPassword, gender } = signupModel;
    return userSignupValidationSchema.validate({
        name,
        email,
        phone,
        password,
        confirmPassword,
        gender,
    }, { abortEarly: false });
};
exports.userSignupValidation = userSignupValidation;
