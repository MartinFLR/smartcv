import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config.entity';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppConfig])],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
