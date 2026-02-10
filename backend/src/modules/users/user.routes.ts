import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { syncCurrentUser } from "../auth/currentUser.middleware";
import { MeController } from "./user.controller";

const router = Router();

router.get("/me", requireAuth, syncCurrentUser, MeController);

export default router;
