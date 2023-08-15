"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const productValidationSchema = joi_1.default.object({
    id: joi_1.default.string().optional(),
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    featured: joi_1.default.boolean().optional(),
    rating: joi_1.default.number().optional(),
    company: joi_1.default.string().required(),
    userId: joi_1.default.string().optional(),
});
const productValidation = (productModel) => {
    const { id, name, price, featured, rating, company, userId } = productModel;
    return productValidationSchema.validate({
        id,
        name,
        price,
        featured,
        rating,
        company,
        userId,
    }, { abortEarly: false });
};
exports.productValidation = productValidation;
