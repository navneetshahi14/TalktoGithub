import {Router} from 'express'

import { ChatController } from './chat.controller'
import { requireAuth } from '@clerk/express';

const router = Router();
const controller = new ChatController();

router.post("/:owner/:repo/conversations", requireAuth, controller.createController);

router.post(
  "/:owner/:repo/:conversationId/stream",
  requireAuth,
  controller.stream
);

router.get(
  "/conversations/:conversationId/messages",
  requireAuth,
  controller.getMessage
);


export default router;