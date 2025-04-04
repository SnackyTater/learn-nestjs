import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { CustomValidationPipe } from './commons/pipes/validation.pipe';

async function bootstrap() {
  try{
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new CustomValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
  } catch(err) {
    console.log('err', err);
  }
}
bootstrap();
