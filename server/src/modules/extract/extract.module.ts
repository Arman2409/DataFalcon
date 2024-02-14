import { Module } from '@nestjs/common';

import { ExtractService } from './extract.service';
import { ExtractResolver } from './extract.resolver';
import { CustomLogger } from '../../tools/logger';

@Module({
  providers: [ExtractService, ExtractResolver, CustomLogger]
})
export class ExtractModule {}
