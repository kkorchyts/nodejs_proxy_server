import { UserData } from "../../../common/middleware/schemas/user-data.schema";
import { UserServiceInterface } from "../user.service.interface";

export class UserServiceImpl implements UserServiceInterface {
  postUserData(userData: UserData): any {
    return {
      result: "logged"
    };
  }
}
