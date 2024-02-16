import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ExtractService } from './extract.service';
import { CustomLogger } from '../../tools/logger';
import { ExtractController } from './extract.controller';

@Module({
  providers: [ExtractService, CustomLogger],
  imports: [
    CacheModule.register({
      ttl: 5 * 60 * 1000, // Time to live (5 minutes)
      max: 100, // Maximum number of items in the cache
    }),
  ],
  controllers: [ExtractController]
})
export class ExtractModule {}
