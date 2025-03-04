import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
  imports: [PrismaModule],
})
export class SampleModules {}
