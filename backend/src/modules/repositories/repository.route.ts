import { Router } from "express";
import { RepositoryController } from "./repository.controller";

const router = Router();

const controller = new RepositoryController();

router.post("/analyze", controller.analyze.bind(controller));

router.get("/:owner/:repo/files", controller.getFileTree.bind(controller));

router.get("/:owner/:repo/chunks", controller.generateChunks.bind(controller));

export default router;
