import { Module } from '@nestjs/common';
import { SampleModules } from './modules/sample/sample.module';

@Module({
  imports: [SampleModules],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
