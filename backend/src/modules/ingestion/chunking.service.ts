export interface CodeChunk {
  repoId: string;
  filePath: string;
  content: string;
  chunkIndex: number;
}

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 150;

export class ChunkingService {
  splitText(repoId: string, filePath: string, text: string): CodeChunk[] {
    const chunks: CodeChunk[] = [];

    let start = 0;
    let index = 0;

    while (start < text.length) {
      const end = start + CHUNK_SIZE;

      const chunkText = text.slice(start, end);

      chunks.push({
        repoId,
        filePath,
        content: chunkText,
        chunkIndex: index++,
      });

      start += CHUNK_SIZE - CHUNK_OVERLAP;
    }

    return chunks;
  }
}
