import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import installSwagger from './installSwagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  installSwagger(app);
  await app.listen(3000);
}
bootstrap();
