import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../modules/profiles/profile.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
