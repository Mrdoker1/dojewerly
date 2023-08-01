import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // или замените '*' на домены, которые должны иметь доступ
  });
  setupSwagger(app);
  await app.listen(4000);
}
bootstrap();
