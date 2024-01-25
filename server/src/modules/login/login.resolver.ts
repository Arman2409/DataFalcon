import { Resolver, Query, Args } from "@nestjs/graphql";
import { UserType } from "src/schemas/types";

@Resolver()
export class LoginResolver {

  @Query(() => UserType, {name: "GetUser"})
  signIn(@Args("username") username:string,
  @Args("password") password:string): UserType {
    console.log(username, password);
    return ({
            name: "Karen",
            bestScore:  15
    });
  }
}