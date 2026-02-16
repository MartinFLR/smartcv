import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtsModule } from '../modules/ats/ats.module';
import { CvModule } from '../modules/cv/cv.module';
import { CoverLetterModule } from '../modules/cover-letter/cover-letter.module';
import { ProfilesModule } from '../modules/profiles/profiles.module';
import { Profile } from '../modules/profiles/profile.entity';
import { SeedModule } from '../core/seeds/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Profile],
      synchronize: true,
    }),
    SeedModule,
    AtsModule,
    CvModule,
    CoverLetterModule,
    ProfilesModule,
  ],
})
export class AppModule {}
