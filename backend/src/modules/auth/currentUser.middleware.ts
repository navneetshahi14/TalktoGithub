import { Request, Response, NextFunction } from "express";
import { UserService } from "../users/user.service";

const userService = new UserService();

export const syncCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const clerkId = (req as any).auth?.userId;
    const email = (req as any).auth?.sessionClaims?.email;

    if (!clerkId) return next();

    let user = await userService.findByClerkId(clerkId);

    if (!user) {
      user = await userService.createUser({
        clerkId,
        email,
      });
    }

    (req as any).currentUser = user;

    next();
  } catch (err) {
    next(err);
  }
};
