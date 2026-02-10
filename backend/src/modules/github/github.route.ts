import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { syncCurrentUser } from "../auth/currentUser.middleware";
import { getRepos } from "./github.controller";
const router = Router();

router.get("/repos", requireAuth, syncCurrentUser, getRepos);

export default router;
