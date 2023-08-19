import { Gender, UserType} from "@prisma/client";

export class MakeAdminUserModel {
  name: string = "";
  email: string = "";
  phone: string;   
  gender: Gender;
  userType: UserType
}
