import { Module, OnModuleInit } from '@nestjs/common';
import { AtsController } from './ats.controller';
import { AtsService } from './ats.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { AtsPromptGenerator } from './prompt/ats-prompt.generator';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AtsController],
  providers: [AtsService, AtsPromptGenerator, PromptService],
})
export class AtsModule implements OnModuleInit {
  constructor(
    private readonly promptService: PromptService,
    private readonly generator: AtsPromptGenerator,
  ) {}

  onModuleInit() {
    this.promptService.register('ats', this.generator);
  }
}
