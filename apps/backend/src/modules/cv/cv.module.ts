import { Module, OnModuleInit } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { CvPromptGenerator } from './prompt/cv-prompt.generator';

@Module({
  controllers: [CvController],
  providers: [CvService, CvPromptGenerator, PromptService],
})
export class CvModule implements OnModuleInit {
  constructor(
    private readonly promptService: PromptService,
    private readonly generator: CvPromptGenerator,
  ) {}

  onModuleInit() {
    this.promptService.register('tailoredCv', this.generator);
  }
}
