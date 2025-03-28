import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { MatchingService } from './matching.service';
import { CreatePreferenceDto, CreatePreferencesDto } from 'src/models/dto/preference.dto';

@Controller('preference')
export class MatchingController {
  constructor(private readonly preferenceService: MatchingService) {}

  @Post()
  async createPreference(@Body(ValidationPipe) body: CreatePreferenceDto): Promise<any>{
    const result = await this.preferenceService.addPreference(body);
    return result;
  }

  @Post('create-many')
  async createPreferences(@Body(ValidationPipe) body: CreatePreferencesDto): Promise<any>{
    const result = await this.preferenceService.addPreferences(body);
    return result;
  }
}