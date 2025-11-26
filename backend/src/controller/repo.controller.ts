import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsync";
import Errorhandler from "../utils/ErrorHandler";
import { parseGithubUrl } from "../utils/github";
import { fetchFolderTree, fetchRepoDetails } from "../service/github.service";
import userModel from "../model/user.model";

export const analyzeRepo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { repoUrl } = req.body as { repoUrl: string };

    if (!repoUrl) {
      return next(new Errorhandler("Repo Url is required", 400));
    }

    let owner: string;
    let name: string;

    try {
      const parsed = parseGithubUrl(repoUrl);
      owner = parsed.owner;
      name = parsed.name;
    } catch (err: any) {
      return next(new Errorhandler("Invalid github repository Url", 400));
    }

    let result;
    try {
      result = await fetchRepoDetails(owner, name);
    } catch (err: any) {
      if (err.response?.status === 404) {
        return next(new Errorhandler("Repository not found on Github", 404));
      }

      if (err.response?.status === 403) {
        return next(new Errorhandler("Github API rate limit exceeded", 429));
      }

      return next(new Errorhandler("Failed to fetch repo details", 500));
    }

    const { repo, languages, topContributors } = result;

    const userId = req.user?._id;
    if (!userId) {
      return next(new Errorhandler("Unauthorized", 401));
    }

    const repoId = repo.id?.toString() || `${owner}/${name}`;
    const fullName = repo.full_name;

    const user = await userModel.findById(userId);

    if (!user) {
      return next(new Errorhandler("User not found", 404));
    }

    const existingRepoIndex = user.savedRepos.findIndex(
      (r) => r.repoId === repoId
    );

    const now = new Date();

    if (existingRepoIndex === -1) {
      user.savedRepos.push({
        repoId,
        fullName,
        lastAnalyzedAt: now,
      });
    } else {
      user.savedRepos[existingRepoIndex].lastAnalyzedAt = now;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      repo: {
        id: repoId,
        fullName: repo.full_name,
        name: repo.name,
        owner: repo.owner?.login,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        watchers: repo.watchers_count,
        defaultBranch: repo.default_branch,
        license: repo.license?.spdx_id || repo.license?.name || null,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
      },
      languages,
      topContributors,
    });
  }
);


export const folderStructure = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const {repoUrl} = req.body as {repoUrl:string}

    const {owner,name} = parseGithubUrl(repoUrl);

    const folderTree = await fetchFolderTree(owner,name);

    return res.status(200).json({
        success:true,
        folderTree:{
            name:"root",
            type:"folder",
            children:folderTree
        }
    })
})
