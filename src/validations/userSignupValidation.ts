import Joi from "joi";
import { SignupModel } from "../models/signupModel";

const userSignupValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  gender: Joi.optional(),
});

export const userSignupValidation = (signupModel: SignupModel) => {
  const { name, email, phone, password, confirmPassword, gender } = signupModel;

  return userSignupValidationSchema.validate(
    {
      name,
      email,
      phone,
      password,
      confirmPassword,
      gender,
    },
    { abortEarly: false }
  );
};
