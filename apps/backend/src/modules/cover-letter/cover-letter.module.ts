import { Module, OnModuleInit } from '@nestjs/common';
import { CoverLetterController } from './cover-letter.controller';
import { CoverLetterService } from './cover-letter.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { CoverLetterPromptGenerator } from './prompt/cover-letter-prompt.generator';

@Module({
  controllers: [CoverLetterController],
  providers: [CoverLetterService, CoverLetterPromptGenerator, PromptService],
})
export class CoverLetterModule implements OnModuleInit {
  constructor(
    private readonly promptService: PromptService,
    private readonly generator: CoverLetterPromptGenerator,
  ) {}

  onModuleInit() {
    this.promptService.register('coverLetter', this.generator);
  }
}
