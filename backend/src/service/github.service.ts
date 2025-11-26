import axios from "axios";
import { ENV } from "../config/ENV";
// import { name } from "ejs";

const GITHUB_API_BASE = "https://api.github.com";

export const fetchRepoDetails = async (owner: string, repo: string) => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (ENV.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${ENV.GITHUB_TOKEN}`;
  }

  const repoRes = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    headers,
  });

  const languagesRes = await axios.get(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
    { headers }
  );

  const contributorsRes = await axios.get(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`,
    { headers }
  );

  return {
    repo: repoRes.data,
    languages: languagesRes.data,
    topContributors: contributorsRes.data,
  };
};

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${ENV.GITHUB_TOKEN}`,
  },
});

export const fetchFolderTree = async (
  owner: string,
  repo: string,
  path = ""
) => {
  const res = await github.get(`/repos/${owner}/${repo}/contents/${path}`);

  const items = res.data;

  const children = await Promise.all(
    items.map(async (item: any) => {
      if (item.type === "dir") {
        return {
          name: item.name,
          type: "folder",
          children: await fetchFolderTree(owner, repo, item.path),
        };
      }

      return {
        name: item.name,
        type: "file",
      };
    })
  );

  return children;
};
