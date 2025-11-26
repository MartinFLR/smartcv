import {
  Controller,
  Post,
  Headers,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AtsService } from './ats.service';
import { AiSettings, CvAtsPayload, BuildPromptOptions } from '@smartcv/types';

@Controller('api')
export class AtsController {
  constructor(private readonly atsService: AtsService) {}

  @Post('ats')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeCvAts(
    @Headers('x-ai-provider') provider: string,
    @Headers('x-ai-model') model: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('jobDesc') jobDesc: string,
    @Body('aiSettings') aiSettings: AiSettings | undefined,
    @Body('promptOption') promptOptionRaw: unknown,
  ) {
    try {
      const headerSettings: AiSettings = {
        modelProvider: provider,
        modelVersion: model,
        systemPrompt: '',
      };

      if (!file || !file.buffer) {
        throw new BadRequestException('No se envió ningún archivo (file) o el buffer está vacío.');
      }
      if (!jobDesc) {
        throw new BadRequestException(
          'Falta la descripción del puesto (jobDesc) en el formulario.',
        );
      }

      let promptOption: BuildPromptOptions | undefined;
      try {
        promptOption =
          typeof promptOptionRaw === 'string'
            ? (JSON.parse(promptOptionRaw) as BuildPromptOptions)
            : (promptOptionRaw as BuildPromptOptions);
      } catch (err) {
        console.warn('No se pudo parsear promptOption:', err);
        promptOption = undefined;
      }

      const payload: CvAtsPayload = {
        file: file.buffer,
        jobDesc,
        aiSettings,
        promptOption,
      };

      const result = await this.atsService.analyzeCvAts(payload, headerSettings);
      return result;
    } catch (err: unknown) {
      console.error('❌ Error en analyzeCvAtsController:', err);
      const message = err instanceof Error ? err.message : 'Error desconocido';
      throw new InternalServerErrorException(message);
    }
  }
}
