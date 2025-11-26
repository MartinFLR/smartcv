import { Controller, Post, Headers, Body, InternalServerErrorException } from '@nestjs/common';
import { CvService } from './cv.service';
import { AiSettings } from '@smartcv/types';
import type { CvPayload } from '@smartcv/types';

@Controller('api')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post('generate-cv')
  async generateCv(
    @Headers('x-ai-provider') provider: string,
    @Headers('x-ai-model') model: string,
    @Body() body: CvPayload,
  ) {
    try {
      const headerSettings: AiSettings = {
        modelProvider: provider,
        modelVersion: model,
        systemPrompt: '',
      };

      const cv = await this.cvService.generateTailoredCv(body, headerSettings);

      return cv;
    } catch (err: unknown) {
      console.error('❌ Error en generateCvController:', err);
      const message = err instanceof Error ? err.message : 'Error desconocido';
      throw new InternalServerErrorException(message);
    }
  }
}
