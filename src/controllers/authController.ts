import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/productDb";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { UuidTool } from "uuid-tool";
import * as jwt from "jsonwebtoken";
import { UserType } from "@prisma/client";
import { ChangePasswordModel } from "../models/changePasswordModel";
import { EditProfileModel } from "../models/editProfileModel";
import { LoginModel } from "../models/loginModel";
import { SignupModel } from "../models/signupModel";
import { UserInfo } from "../models/userInfoModel";

const changePassword = async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword, confirmPassword } =
    req.body as ChangePasswordModel;

  //----> Check the existence of user.
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }

  //----> Check the equality of new password and confirm password.
  if (confirmPassword.normalize() !== newPassword.normalize()) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "New password must match confirm password!"
    );
  }

  //----> Check for the correctness of the user password.
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(oldPassword, hashedPassword);
  if (!isValidPassword) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }

  //----> Hash the new password.
  const newPasswordHashed = await bcrypt.hash(newPassword, 12);

  //----> Insert the new password in the database.
  const updatedUserInfo = await prisma.user.update({
    where: { email },
    data: { ...user, password: newPasswordHashed },
  });

  //----> Get jwt token.
  const token = await getJwtToken(
    updatedUserInfo.id,
    updatedUserInfo.name,
    updatedUserInfo.userType
  );

  //----> Send response to user.
  res.status(StatusCodes.OK).json({
    message: "password updated successfully!",
    isLoggedIn: true,
    token,
  });
};

const currentUser = async (req: Request, res: Response) => {
  const userInfo = req["userInfo"] as UserInfo;

  if (!userInfo) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }

  const userId = userInfo?.id;

  const isUuid = UuidTool.isUuid(userId);

  if (!userId || !isUuid) {
    throw catchError(StatusCodes.NOT_FOUND, `User with id = ${userId}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      gender: true,      
    },
  });

  if (!user) {
    throw catchError(StatusCodes.NOT_FOUND, `User with id = ${userId}`);
  }

  //----> Send the response.
  res.status(StatusCodes.OK).json(user);
};

const deleteUserByEmail = async (req: Request, res: Response) => {
  //----> Destructure email and password from the request body.
  const {email} = req.body;
  
  //---> Check for the existence of user.
  const user = await prisma.user.findUnique({where: {email}});
  if (!user){
    throw catchError(StatusCodes.NOT_FOUND, `User with email : ${email}is not found!`);
  }

  //----> Delete the user with the above given email from the database.
  const deletedUser = await prisma.user.delete({where: {email}});

  //----> Send back the response.
  res.status(StatusCodes.OK).json({status: "Success", message: `User with email : ${email} deleted successfully!`, deleteUser});

}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  //----> Check for the existence of user.
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw catchError(
      StatusCodes.NOT_FOUND,
      `The user with id = ${id} does not exist!`
    );
  }

  //----> Remove the user from database.
  const deletedUser = await prisma.user.delete({ where: { id } });

  //----> Send response to the admin.
  res.status(StatusCodes.OK).json({
    message: "User has been successfully removed!",
    user: deletedUser,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  //----> Get all users from database.
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      gender: true,
    },
  });

  //----> Check for availability of users
  if (!users) {
    throw catchError(StatusCodes.NOT_FOUND, "No user in the database");
  }

  //----> Send back the response.
  res
    .status(StatusCodes.OK)
    .json({status: "success", message: "Users are fetched successfully!", users });
};

const getOneUser = async (req: Request, res: Response) => {
  //----> Get user id from params.
  const { id } = req.params;

  //----> Get the user from database.
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      gender: true,
    },
  });

  //----> Check for existence of user.
  if (!user) {
    throw catchError(
      StatusCodes.NOT_FOUND,
      `The user with id = ${id} is not found in the database!`
    );
  }

  //----> Send back the response.
  res
    .status(StatusCodes.OK)
    .json({ message: "The user is fetched success", user });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as LoginModel;
  //----> Check the authenticity of the user.
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }
  //----> Check for the correctness of the user password.
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(password, hashedPassword);

  if (!isValidPassword) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }

  //---> Get jwt token.
  const token = await getJwtToken(user.id, user.name, user.userType);
  //----> Send back the response to user.
  res
    .status(StatusCodes.OK)
    .json({ message: "Login is successful!", isLoggedIn: true, token, userType: user.userType });
};

const makeAdmin = async (req: Request, res: Response) => {
  //----> Get user credentials.
  const userInfo = req["userInfo"] as UserInfo;

  //----> Check for authentication.
  if (!userInfo) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  const userId = userInfo?.id;

  const isUuid = UuidTool.isUuid(userId);

  //----> Check for validity of id.
  if (!userId || !isUuid) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  //----> Check for admin rights.
  const isAdmin = userInfo?.userType === UserType.Admin;

  if (!isAdmin) {
    throw catchError(
      StatusCodes.FORBIDDEN,
      "You are not permitted to perform this task!"
    );
  }

  //----> Get the email and user details of person to be made admin.
  const { email: userEmail } = req.body;

  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  //----> Check if user exist.
  if (!user) {
    throw catchError(
      StatusCodes.NOT_FOUND,
      "This user is not in the database!"
    );
  }

  //----> Make the user an admin.
  const userUpdated = await prisma.user.update({
    where: { email: userEmail },
    data: { ...user, userType: UserType.Admin },
  });

  //----> Send back the response.
  res.status(StatusCodes.OK).json({
    message: `The user with email = ${userUpdated.email} is now an admin!`,
    userUpdated,
  });
};

const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, ...signup } =
    req.body as SignupModel;

  //----> Check for the existence of the user.
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw catchError(StatusCodes.BAD_REQUEST, "User already exist!");
  }

  //----> Check the equality of password and confirmPassword.
  if (password.normalize() !== confirmPassword.normalize()) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Password must match confirm password!"
    );
  }

  //----> Encrypt the password.
  const hashedPassword = await bcrypt.hash(password, 12);

  //----> Save the new user in the database.
  const newUser = await prisma.user.create({
    data: { ...signup, email, password: hashedPassword },
  });

  //---> Get jwt token.
  const token = await getJwtToken(newUser.id, newUser.name, newUser.userType);

  //----> Send back the response to user.
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Signup is successful!", isLoggedIn: true, token });
};

const updateProfile = async (req: Request, res: Response) => {
  const { email, password, ...editedProfile } = req.body as EditProfileModel;
  
  //----> Check for the existence of user.
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }

  //----> Check for the correctness of the user password.
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (!isValidPassword) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }

  //----> Insert the edited profile info of the user in the database.
  const editedUserInfo = await prisma.user.update({
    where: { email },
    data: {
      ...editedProfile,
      id: user.id,
      email: user.email,
      password: hashedPassword,
      //  userType: user.userType,
    },
  });

  //----> Get the jwt token.
  const token = await getJwtToken(
    editedUserInfo.id,
    editedUserInfo.name,
    editedUserInfo.userType
  );

  //----> Send the response to the user.
  res
    .status(StatusCodes.OK)
    .json({ message: "Profile updated successfully", isLoggedIn: true, token });
};

async function getJwtToken(id: string, name: string, userType: UserType) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

  return jwt.sign({ id, name, userType }, JWT_SECRET_KEY, { expiresIn: "1hr" });
}

export {
  changePassword,
  currentUser,
  deleteUser,
  deleteUserByEmail,
  getAllUsers,
  getOneUser,
  login,
  makeAdmin,
  signup,
  updateProfile,
};
