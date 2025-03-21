// src/rag/rag.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RagService } from './rag.service';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('query')
  async query(@Body('query') query: string): Promise<string> {
    if (!query) {
      throw new Error('Query parameter is required');
    }
    return this.ragService.retrieveAndGenerate(query);
  }
}