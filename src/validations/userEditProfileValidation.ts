import Joi from "joi";
import { EditProfileModel } from "../models/editProfileModel";

const editProfileValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  gender: Joi.optional(),
});

export const userEditProfileValidation = (
  editProfileModel: EditProfileModel
) => {
  const { name, email, phone, password, gender } = editProfileModel;

  return editProfileValidationSchema.validate(
    {
      name,
      email,
      phone,
      password,
      gender,
    },
    { abortEarly: false }
  );
};
