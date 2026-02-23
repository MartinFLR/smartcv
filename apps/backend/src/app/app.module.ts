import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtsModule } from '../modules/ats/ats.module';
import { CvModule } from '../modules/cv/cv.module';
import { CoverLetterModule } from '../modules/cover-letter/cover-letter.module';
import { ProfilesModule } from '../modules/profiles/profiles.module';
import { Profile } from '../modules/profiles/profile.entity';
import { SeedModule } from '../core/seeds/seed.module';
import { ConfigModule } from '../modules/config/config.module';
import { AppConfig } from '../modules/config/config.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Profile, AppConfig],
      synchronize: true,
    }),
    SeedModule,
    AtsModule,
    CvModule,
    CoverLetterModule,
    ProfilesModule,
    ConfigModule,
  ],
})
export class AppModule {}
