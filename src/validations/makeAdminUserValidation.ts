import Joi from "joi";
import { MakeAdminUserModel } from "../models/makeAdminUserModel";

const makeAdminUserValidationSchema = Joi.object({
  email: Joi.string().optional().email(),
  name: Joi.string().optional(),
  phone: Joi.string().optional(), 
  gender: Joi.optional(),
  userType: Joi.optional(),
});

export const makeAdminUserValidation = (
  makeAdminUserModel: MakeAdminUserModel
) => {
  const { name, email, phone, gender, userType } = makeAdminUserModel;

  return makeAdminUserValidationSchema.validate(
    {
      name,
      email,
      phone,  
      gender,
    },
    { abortEarly: false }
  );
};
