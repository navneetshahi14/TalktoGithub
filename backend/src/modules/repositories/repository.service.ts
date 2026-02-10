import { RepositoryModel } from "./respository.schema";

export class RepositoryService {
  async findByUrl(url: string) {
    return RepositoryModel.findOne({ url });
  }

  async create(data: any) {
    return RepositoryModel.create(data);
  }

  async updateMany(repos: any[]) {
    const ops = repos.map((repo) => ({
      updateOne: {
        filter: { url: repo.url },
        update: repo,
        upsert: true,
      },
    }));

    return RepositoryModel.bulkWrite(ops);
  }

  async findByOwnerAndName(owner: string, name: string) {
    return RepositoryModel.findOne({ owner, name });
  }
}
