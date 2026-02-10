import { Octokit } from "@octokit/rest";
import { RepositoryModel } from "../repositories/respository.schema";

export class GithubService {
  private getClient(token: string) {
    return new Octokit({ auth: token });
  }

  async getUserRepos(token: string) {
    const octokit = this.getClient(token);

    const { data } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
      sort: "updated",
    });

    return data.map((repo) => ({
      name: repo.name,
      owner: repo.owner?.login,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
    }));
  }

  async getRepoByOwnerAndName(owner: string, repo: string) {
    const octokit = new Octokit();

    const { data } = await octokit.repos.get({ owner, repo });

    return {
      owner: data.owner.login,
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      isPrivate: data.private,
    };
  }

  private octokit = new Octokit();

  async getRepoFileTree(owner: string, repo: string) {
    const { data: repoData } = await this.octokit.repos.get({ owner, repo });

    const defaultBranch = repoData.default_branch;

    const { data: branchData } = await this.octokit.repos.getBranch({
      owner,
      repo,
      branch: defaultBranch,
    });

    const treeSha = branchData.commit.sha;

    const { data: treeData } = await this.octokit.git.getTree({
      owner,
      repo,
      tree_sha: treeSha,
      recursive: "1",
    });

    return treeData.tree;
  }

  async getFileContent(owner: string, repo: string, path: string) {
    const { data } = await this.octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (!("content" in data)) return null;

    const decoded = Buffer.from(data.content, "base64").toString("utf-8");

    return decoded;
  }
}
