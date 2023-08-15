"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEditProfileValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const editProfileValidationSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    name: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    gender: joi_1.default.optional(),
});
const userEditProfileValidation = (editProfileModel) => {
    const { name, email, phone, password, gender } = editProfileModel;
    return editProfileValidationSchema.validate({
        name,
        email,
        phone,
        password,
        gender,
    }, { abortEarly: false });
};
exports.userEditProfileValidation = userEditProfileValidation;
