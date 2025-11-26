import { Module } from '@nestjs/common';
import { AtsModule } from '../modules/ats/ats.module';
import { CvModule } from '../modules/cv/cv.module';
import { CoverLetterModule } from '../modules/cover-letter/cover-letter.module';

@Module({
  imports: [AtsModule, CvModule, CoverLetterModule],
})
export class AppModule {}
