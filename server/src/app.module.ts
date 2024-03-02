import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExtractModule } from './modules/extract/extract.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ExtractModule,
  ],
  providers: [],
})
export class AppModule { }
