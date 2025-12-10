import mongoose, { Document, Schema, Model, Types } from "mongoose";
import jwt, { Secret } from "jsonwebtoken";
import { ENV } from "../config/ENV";
import bcrypt from "bcryptjs";
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatarUrl?: string;

  password: string;

  githubId?: string;
  githubUsername?: string;
  githubAccessToken?: string;

  savedRepos: {
    repoId: string;
    fullName: string;
    lastAnalyzedAt: Date;
  }[];

  credits: number;
  requestsUsedToday: number;
  lastRequestAt: Date;

  plan: "Free" | "Pro" | "Ultra";
  planExpiredAt?: Date;

  createdAt: Date;
  updatedAt: Date;

  SignAccessToken: () => string;
  SignRefreshToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter valid email",
      },
      unique: true,
    },
    avatarUrl: String,
    password: {
      type: String,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubUsername: String,
    githubAccessToken: String,

    savedRepos: [
      {
        repoId: String,
        fullName: String,
        lastAnalyzedAt: Date,
      },
    ],
    credits: {
      type: Number,
      default: 50,
    },
    requestsUsedToday: {
      type: Number,
      default: 0,
    },
    lastRequestAt: {
      type: Date,
      default: null,
    },

    plan: {
      type: String,
      enum: ["Free", "Pro", "Ultra"],
      default: "Free",
    },
    planExpiredAt: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, ENV.JWT_SECRET as Secret, {
    expiresIn: "5m",
  });
};

UserSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, ENV.JWT_SECRET as Secret, {
    expiresIn: "3d",
  });
};

UserSchema.methods.comparePassword = async function(enteredPassword:string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword,this.password);
}

const userModel: Model<IUser> = mongoose.model("User", UserSchema);

export default userModel;
