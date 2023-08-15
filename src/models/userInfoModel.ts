import { UserType } from "@prisma/client";

export class UserInfo {
  id: string;
  name: string;
  userType!: UserType;
  token?: string;
  message?: string;
}