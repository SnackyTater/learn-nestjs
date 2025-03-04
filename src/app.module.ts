import { Module } from '@nestjs/common';
import { SampleModules } from './modules/sample/sample.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SampleModules, PrismaModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
