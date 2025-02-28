import { Module } from '@nestjs/common';
import { SampleController } from './modules/sample/sample.controller';
import { SampleService } from './modules/sample/sample.service';

@Module({
  imports: [],
  controllers: [SampleController],
  providers: [SampleService],
})
export class AppModule {}
