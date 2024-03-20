import { UserData } from "../../common/middleware/schemas/user-data.schema";

export interface UserServiceInterface {
  postUserData(userData: UserData): any;
}
