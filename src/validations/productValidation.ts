import Joi from "joi";
import { ProductModel } from "../models/productModel";

const productValidationSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  featured: Joi.boolean().optional(),
  rating: Joi.number().optional(),
  company: Joi.string().required(),
  userId: Joi.string().optional(),
}, );

export const productValidation = (productModel: ProductModel) => {
  const { id, name, price, featured, rating, company, userId } = productModel;

  return productValidationSchema.validate({
    id,
    name,
    price,
    featured,
    rating,
    company,
    userId,
  },{abortEarly: false});
};
