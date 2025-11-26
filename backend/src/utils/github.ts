export interface ParsedRepo {
  owner: string;
  name: string;
}

export const parseGithubUrl = (repoUrl: string) => {
  try {
    const trimmed = repoUrl.trim();

    if (!trimmed.startsWith("http")) {
      throw new Error("Invalid Github URL");
    }

    const url = new URL(trimmed);

    if (url.hostname !== "github.com") {
      throw new Error("Invalid Github URL");
    }

    const parts = url.pathname.split('/').filter(Boolean);

    if(parts.length < 2){
        throw new Error("Invalid Github repository URL");
    }

    return {
        owner: parts[0],
        name: parts[1].replace(".git",""),
    }

  } catch (err: any) {
    throw new Error("Invalid GitHub repository URL");
  }
};
