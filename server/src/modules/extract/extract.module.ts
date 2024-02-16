import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ExtractService } from './extract.service';
import { ExtractResolver } from './extract.resolver';
import { CustomLogger } from '../../tools/logger';

@Module({
  providers: [ExtractService, ExtractResolver, CustomLogger],
  imports: [
    CacheModule.register({
      ttl: 5 * 60 * 1000, // Time to live (5 minutes)
      max: 100, // Maximum number of items in the cache
    }),
  ]
})
export class ExtractModule {}
