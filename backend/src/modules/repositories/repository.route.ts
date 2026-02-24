import { Router } from "express";
import { RepositoryController } from "./repository.controller";

const router = Router();

const controller = new RepositoryController();

router.post("/analyze", controller.analyze.bind(controller));

router.get("/:owner/:repo/files", controller.getFileTree.bind(controller));

router.get("/:owner/:repo/chunks", controller.generateChunks.bind(controller));

router.post("/:owner/:repo/embed", controller.embedRepo.bind(controller));

router.get("/:owner/:repo/summary", controller.getSummary);

router.get("/:owner/:repo/swot", controller.getSwot);


export default router;
