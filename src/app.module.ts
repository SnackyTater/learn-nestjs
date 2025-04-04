import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { LoggerMiddleware } from './commons/middlewares/logger.middleware';

import { PreferenceModules } from './modules/preference/preference.module';
import { AccountModules } from './modules/account/account.module';
import { SampleModules } from './modules/sample/sample.module';
import { AuthModules } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

const CacheModules = CacheModule.register({
  isGlobal: true
})

@Module({
  imports: [SampleModules, PreferenceModules, AuthModules, PrismaModule, AccountModules, CacheModules],
  controllers: [],
  providers: [],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
