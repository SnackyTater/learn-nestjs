import { Module } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PreferenceController],
  providers: [PreferenceService],
  imports: [PrismaModule],
})
export class PreferenceModules {}
