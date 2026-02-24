import { IUser } from "../modules/users/user.schema";


declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}
