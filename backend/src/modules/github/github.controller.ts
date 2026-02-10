import { NextFunction, Request, Response } from "express";
import { getGithunToken } from "../auth/githubToken.util";
import { GithubService } from "./github.service";
import { RepositoryService } from "../repositories/repository.service";

const githubService = new GithubService();
const repoService = new RepositoryService();

export const getRepos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getGithunToken(req);

    if (!token) {
      return res.status(400).json({ message: "Github not connected" });
    }

    const repos = await githubService.getUserRepos(token);

    await repoService.updateMany(repos);

    res.json(repos);
  } catch (err) {
    next(err);
  }
};
