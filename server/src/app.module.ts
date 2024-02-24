import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { ExtractModule } from './modules/extract/extract.module';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   context: ({ req, res }) => console.log(req.body),
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   playground: true,
    // }),
    ConfigModule.forRoot(),
    ExtractModule,
  ],
  providers: [],
})
export class AppModule { }
