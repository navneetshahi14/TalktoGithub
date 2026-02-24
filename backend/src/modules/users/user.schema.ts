import { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  clerkId: string;
}

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    githubUsername: String,
    name: String,
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("User", userSchema);
