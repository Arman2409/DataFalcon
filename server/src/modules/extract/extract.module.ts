import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ExtractService } from './extract.service';
import { CustomLogger } from '../../tools/logger';
import { ExtractController } from './extract.controller';
import * as configs from "../../../configs/extract.json";

const { cacheConfig } = { ...configs };

@Module({
  providers: [
    ExtractService,
    CustomLogger
  ],
  imports: [
    CacheModule.register(cacheConfig),
  ],
  controllers: [ExtractController]
})
export class ExtractModule { }
