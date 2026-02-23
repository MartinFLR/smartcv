import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('api/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getAll() {
    return this.configService.getAll();
  }

  @Post()
  async set(@Body() body: { key: string; value: string }) {
    return this.configService.set(body.key, body.value);
  }

  @Post('batch')
  async setBatch(@Body() body: Record<string, string>) {
    for (const [key, value] of Object.entries(body)) {
      if (value !== null && value !== undefined) {
        await this.configService.set(key, value);
      }
    }
    return { success: true };
  }
}
