import { Module } from '@nestjs/common';

import { ExtractService } from './extract.service';
import { ExtractResolver } from './extract.resolver';

@Module({
  providers: [ExtractService, ExtractResolver]
})
export class ExtractModule {}
