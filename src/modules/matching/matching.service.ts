import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto, CreatePreferencesDto } from 'src/models/dto/preference.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private readonly prisma: PrismaService) {}

  async addPreference(data: CreatePreferenceDto){
    const res = await this.prisma.preference.create({ data });
    return res;
  }

  async addPreferences(data: CreatePreferencesDto){
    const preferenceList = data.names.map(name => ({name}));
    const res = await this.prisma.preference.createMany({data: preferenceList})
    return res;
  }
}
