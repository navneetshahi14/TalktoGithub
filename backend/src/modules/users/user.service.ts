import { UserModel } from "./user.schema";

export class UserService {
  async findByClerkId(clerkId: string) {
    return UserModel.findOne({ clerkId });
  }

  async createUser(data: { clerkId: string; email: string; name?: string }) {
    return UserModel.create(data);
  }
}
