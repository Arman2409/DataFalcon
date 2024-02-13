import { Inject } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { UserType } from "src/schemas/types";
import { LoginService } from "./login.service";

@Resolver()
export class LoginResolver {
  constructor(private readonly service: LoginService) { };

  @Query(() => UserType, { name: "GetUser" })
  async signIn(@Args("username") username: string,
    @Args("password") password: string): Promise<UserType> {
    return await this.service.findUser(username, password);
  }

  @Query(() => UserType, { name: "CreateUser" })
  async signUp(@Args("username") username: string,
    @Args("password") password: string): Promise<UserType> {
    return await this.service.createUser(username, password);
  }
}