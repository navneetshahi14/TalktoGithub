import { Request, Response } from "express";

export const MeController = async (req: Request, res: Response) => {
  try {
    res.json((req as any).currentUser);
  } catch (err) {
    console.error(err);
  }
};
