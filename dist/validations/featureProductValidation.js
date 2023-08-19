"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureProductValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const productValidationSchema = joi_1.default.object({
    id: joi_1.default.string().optional(),
    name: joi_1.default.string().optional(),
    price: joi_1.default.number().optional(),
    featured: joi_1.default.boolean().optional(),
    company: joi_1.default.string().optional(),
});
const featureProductValidation = (productModel) => {
    const { id, name, price, featured, company } = productModel;
    return productValidationSchema.validate({
        id,
        name,
        price,
        featured,
        company
    }, { abortEarly: false });
};
exports.featureProductValidation = featureProductValidation;
