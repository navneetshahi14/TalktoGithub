import { NextFunction, Request, Response } from "express";
import { RepoChatService } from "./repoChat.service";
import { ChatService } from "./chat.service";
import { ChatMessageModel } from "./chatMessage.schema";

const repoChatService = new RepoChatService();
const conversationService = new ChatService();

export class ChatController {
  async createController(req: Request, res: Response, next: NextFunction) {
    try {
      const { owner, repo } = req.params;

      const userId = req.currentUser?._id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const repoId = `${owner}/${repo}`;

      const convo = await conversationService.createConversation(repoId, userId);

      res.json(convo);
    } catch (err) {
      next(err);
    }
  }

  async stream(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversationId } = req.params;
      const { owner, repo } = req.params;
      const { question } = req.body;

      const repoId = `${owner}/${repo}`;

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      await repoChatService.askRepo(conversationId, repoId, question, (token) => {
        res.write(`data: ${token}\n\n`);
      });

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (err) {
      next(err);
    }
  }

  async getMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversationId } = req.params;

      const message = await ChatMessageModel.find({ conversationId })
        .sort({ createdAt: 1 })
        .limit(100);

      res.json(message);
    } catch (err) {
      next(err);
    }
  }
}
