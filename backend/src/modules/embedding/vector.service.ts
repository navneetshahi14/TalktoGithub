import { CodeChunkModel } from "./CodeChunk.schema";

export class VectorService {
  async storeChunks(chunks: any[]) {
    return CodeChunkModel.insertMany(chunks);
  }

  async findByRepo(repoId: string) {
    return CodeChunkModel.find({ repoId });
  }
}
