import { Controller, Post, Headers, Body, Res, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { CoverLetterService } from './cover-letter.service';
import { AiSettings } from '@smartcv/types';
import type { CoverLetterPayload } from '@smartcv/types';

@Controller('api')
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  @Post('generate-cover-letter')
  async generateCoverLetter(
    @Headers('x-ai-provider') provider: string,
    @Headers('x-ai-model') model: string,
    @Body() body: CoverLetterPayload,
    @Res() res: Response,
  ) {
    try {
      const headerSettings: AiSettings = {
        modelProvider: provider,
        modelVersion: model,
        systemPrompt: '',
      };
      console.log(headerSettings.modelVersion);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      const stream = await this.coverLetterService.generateCoverLetterStream(body, headerSettings);

      if (!stream) {
        throw new Error('No se pudo generar el stream.');
      }
      for await (const chunk of stream) {
        res.write(chunk);
      }

      res.end();
    } catch (err: unknown) {
      console.error('❌ Error en generateCoverLetterController:', err);

      if (!res.headersSent) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        throw new InternalServerErrorException(message);
      } else {
        res.end();
      }
    }
  }
}
