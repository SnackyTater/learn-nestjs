import { Module } from '@nestjs/common';
import { MatchingController } from './matching.controller';
import { MatchingService } from './matching.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MatchingController],
  providers: [MatchingService],
  imports: [PrismaModule],
})
export class PreferenceModules {}
