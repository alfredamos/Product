import Joi from "joi";
import { LoginModel } from "../models/loginModel";
import { log } from "console";

const loginValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const userLoginValidation = (loginModel: LoginModel) => {
  const { email, password } = loginModel;

  return loginValidationSchema.validate(
    { email, password },
    { abortEarly: false }
  );
};
