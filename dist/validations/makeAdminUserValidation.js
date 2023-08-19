"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAdminUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const makeAdminUserValidationSchema = joi_1.default.object({
    email: joi_1.default.string().optional().email(),
    name: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional(),
    gender: joi_1.default.optional(),
    userType: joi_1.default.optional(),
});
const makeAdminUserValidation = (makeAdminUserModel) => {
    const { name, email, phone, gender, userType } = makeAdminUserModel;
    return makeAdminUserValidationSchema.validate({
        name,
        email,
        phone,
        gender,
    }, { abortEarly: false });
};
exports.makeAdminUserValidation = makeAdminUserValidation;
