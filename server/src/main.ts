import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"]
  });
  app.enableCors();
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
