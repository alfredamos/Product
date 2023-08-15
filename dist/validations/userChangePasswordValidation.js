"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChangePasswordValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const changePasswordValidationSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    oldPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required(),
});
const userChangePasswordValidation = (changePasswordModel) => {
    const { email, oldPassword, newPassword, confirmPassword } = changePasswordModel;
    return changePasswordValidationSchema.validate({
        email,
        oldPassword,
        newPassword,
        confirmPassword,
    }, { abortEarly: false });
};
exports.userChangePasswordValidation = userChangePasswordValidation;
