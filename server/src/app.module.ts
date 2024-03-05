import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExtractModule } from './modules/extract/extract.module';

@Module({
  imports: [
    ExtractModule,
    ConfigModule.forRoot(),
  ]
})

export class AppModule { }
