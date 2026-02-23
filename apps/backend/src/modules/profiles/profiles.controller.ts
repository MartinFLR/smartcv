import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import type { CvForm } from '@smartcv/types';

@Controller('api/profiles')
export class ProfilesController {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profilesRepository.find({ order: { updatedAt: 'DESC' } });
  }

  @Post()
  async create(@Body() body: { name: string; data: CvForm }): Promise<Profile> {
    const bodySize = JSON.stringify(body).length;
    console.log(
      `[ProfilesController] POST /api/profiles - name: "${body?.name}", hasData: ${!!body?.data}, bodySize: ${(bodySize / 1024).toFixed(1)}KB`,
    );

    try {
      const profile = new Profile();
      profile.name = body.name;
      profile.data = body.data;
      const saved = await this.profilesRepository.save(profile);
      console.log(`[ProfilesController] ✅ Perfil guardado - id: ${saved.id}`);
      return saved;
    } catch (err) {
      console.error('❌ [ProfilesController] Error al crear perfil:', err);
      throw err;
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; data?: CvForm },
  ): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }
    if (body.name) profile.name = body.name;
    if (body.data) profile.data = body.data;
    return this.profilesRepository.save(profile);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.profilesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }
  }
}
