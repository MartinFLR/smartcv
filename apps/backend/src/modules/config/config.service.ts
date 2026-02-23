import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfig } from './config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(AppConfig)
    private configRepository: Repository<AppConfig>,
  ) {}

  async get(key: string): Promise<string | null> {
    const config = await this.configRepository.findOne({ where: { key } });
    return config ? config.value : null;
  }

  async set(key: string, value: string): Promise<AppConfig> {
    let config = await this.configRepository.findOne({ where: { key } });
    if (config) {
      config.value = value;
    } else {
      config = this.configRepository.create({ key, value });
    }
    return this.configRepository.save(config);
  }

  async getAll(): Promise<Record<string, string>> {
    const configs = await this.configRepository.find();
    return configs.reduce(
      (acc, config) => {
        acc[config.key] = config.value;
        return acc;
      },
      {} as Record<string, string>,
    );
  }
}
