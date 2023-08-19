import Joi from "joi";
import FeatureProductModel from "../models/featureProductModel";

const productValidationSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  featured: Joi.boolean().optional(),
  company: Joi.string().optional(),
});

export const featureProductValidation = (productModel: FeatureProductModel) => {
  const { id, name, price, featured, company} = productModel;

  return productValidationSchema.validate(
    {
      id,
      name,
      price,
      featured,     
      company
    },
    { abortEarly: false }
  );
};
