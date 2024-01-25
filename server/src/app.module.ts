import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { join } from 'path';

import { LoginModule } from './modules/login/login.module';
import { LoginService } from './modules/login/login.service';
import { LoginResolver } from './modules/login/login.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req, res}) => console.log(req.body),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    ConfigModule.forRoot(),
    LoginModule
  ],
  providers: [LoginService, LoginResolver],
})
export class AppModule {}
