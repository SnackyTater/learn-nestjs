import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SampleModules } from './modules/sample/sample.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerMiddleware2 } from './middlewares/logger2.middleware';

@Module({
  imports: [SampleModules],
  controllers: [],
  providers: [],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
    consumer.apply(LoggerMiddleware2).forRoutes('*')
  }
}
