import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/ExceptionFilter';
import { CustomLogger } from './tools/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"]
  });
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(new CustomLogger()));
  await app.listen(process.env.PORT);
}
bootstrap();
