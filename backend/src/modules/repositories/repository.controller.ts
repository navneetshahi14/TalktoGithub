import { NextFunction, Request, Response } from "express";
import { GithubService } from "../github/github.service";
import { RepositoryService } from "./repository.service";
import { parseGithubUrl } from "../../commons/utils/githubUrl";
import { filterUsefulFiles } from "../ingestion/fileFilter";
import { ChunkingService } from "../ingestion/chunking.service";
import { cleanText } from "../ingestion/textCleaner";
import { EmbeddingService } from "../embedding/embedding.service";
import { VectorService } from "../embedding/vector.service";
import { RepoChatService } from "../chats/repoChat.service";

const githubService = new GithubService();
const repoService = new RepositoryService();
const chunkingService = new ChunkingService();
const embeddingService = new EmbeddingService();
const vectorService = new VectorService();
const repoChatService = new RepoChatService();

export class RepositoryController {
  async analyze(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.body;

      const parsed = parseGithubUrl(url);
      if (!parsed) {
        return res.status(400).json({ message: "Invalid Github Url" });
      }

      const { owner, repo } = parsed;

      let repository = await repoService.findByOwnerAndName(owner, repo);

      if (repository) {
        return res.json({
          source: "cache",
          repository,
        });
      }

      const repoData = await githubService.getRepoByOwnerAndName(owner, repo);

      let Repository = await repoService.create(repoData);

      return res.json({
        source: "github",
        Repository,
      });
    } catch (err) {
      next(err);
    }
  }

  async getFileTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { owner, repo } = req.params;

      const tree = await githubService.getRepoFileTree(owner, repo);

      const usefulFiles = filterUsefulFiles(tree);

      res.json({
        totalFiles: tree.length,
        usefulFiles: usefulFiles.length,
        files: usefulFiles.slice(0, 50),
      });
    } catch (err) {
      next(err);
    }
  }

  async generateChunks(req: Request, res: Response, next: NextFunction) {
    try {
      const { owner, repo } = req.params;

      const tree = await githubService.getRepoFileTree(owner, repo);
      const usefulFiles = filterUsefulFiles(tree).slice(0, 20);

      const allChunks = [];

      for (const file of usefulFiles) {
        const content = await githubService.getFileContent(
          owner,
          repo,
          file.path,
        );
        if (!content) continue;

        const cleaned = cleanText(content);

        const chunks = chunkingService.splitText(
          `${owner}/${repo}`,
          file.path,
          cleaned,
        );

        allChunks.push(...chunks);
      }

      res.json({
        filesProcessed: usefulFiles.length,
        totalChunks: allChunks.length,
        preview: allChunks.slice(0, 5),
      });
    } catch (err) {
      next(err);
    }
  }

  async embedRepo(req: Request, res: Response, next: NextFunction) {
    try {
      const { owner, repo } = req.params;
      const repoId = `${owner}/${repo}`;

      const tree = await githubService.getRepoFileTree(owner, repo);
      const usefulFiles = filterUsefulFiles(tree).slice(0, 10);

      const storedChunks = [];

      for (const file of usefulFiles) {
        const content = await githubService.getFileContent(
          owner,
          repo,
          file.path,
        );
        if (!content) continue;

        const cleaned = cleanText(content);
        const chunks = chunkingService.splitText(repoId, file.path, cleaned);

        for (const chunk of chunks) {
          const embedding = await embeddingService.generateEmbedding(
            chunk.content,
          );

          storedChunks.push({
            ...chunk,
            embedding,
          });
        }

        await vectorService.storeChunks(storedChunks);

        res.json({
          message: "Embedding generated",
          totalChunks: storedChunks.length,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const { owner, repo } = req.params;

      const repoId = `${owner}/${repo}`;

      const summary = await repoChatService.generateRepoSummary(repoId);

      res.json({ summary });
    } catch (err) {
      next(err);
    }
  }

  async getSwot(req: Request, res: Response, next: NextFunction) {
    try {
      const { owner, repo } = req.params;
      const repoId = `${owner}/${repo}`;

      const swot = await repoChatService.generateSwot(repoId);

      res.json(swot);
    } catch (err) {
      next(err);
    }
  }
}
