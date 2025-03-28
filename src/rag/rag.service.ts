import { Injectable } from '@nestjs/common';
import { DocumentService } from '../document/document.service';
import { ChatService } from '../chat/chat.service';
import { EmbeddingService } from '../embedding/embedding.service';
import { DocumentEntity } from 'src/document/document.entity';
import { title } from 'process';

@Injectable()
export class RagService {
  constructor(
    private readonly _documentService: DocumentService,
    private readonly _chatService: ChatService,
    private readonly _embeddingService: EmbeddingService,
  ) {}

  async retrieveAndGenerate(query: string): Promise<any> {
    // Step 1: Generate embedding for the query
    console.log('embedding');
    const queryEmbedding = await this._embeddingService.embed(query);

    // Step 2: Retrieve relevant documents (you can implement a similarity search here)
    console.log('retrieve documents');
    const documents = await this._documentService.getAllDocuments();

    // Step 3: Find the most relevant document (simple cosine similarity for baseline)
    console.log('searching for similar docs');
    const relevantDocument = this._documentService.findMostRelevantDocuments(
      documents,
      queryEmbedding,
    );

    if (process.env.MODEL_NAME == 'all-minilm') {
      return relevantDocument.map((doc) => ({
        title: doc.document.title,
        similarity: doc.similarity,
      }));
    }
  }
}
