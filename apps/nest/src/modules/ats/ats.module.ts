import { Module } from '@nestjs/common';
import { AtsController } from './ats.controller';
import { AtsService } from './ats.service';

@Module({
  controllers: [AtsController],
  providers: [AtsService],
})
export class AtsModule {}
