import Joi from "joi";
import { ChangePasswordModel } from "../models/changePasswordModel";

const changePasswordValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const userChangePasswordValidation = (
  changePasswordModel: ChangePasswordModel
) => {
  const { email, oldPassword, newPassword, confirmPassword } =
    changePasswordModel;

  return changePasswordValidationSchema.validate(
    {
      email,
      oldPassword,
      newPassword,
      confirmPassword,
    },
    { abortEarly: false }
  );
};
