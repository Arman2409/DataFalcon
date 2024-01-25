import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class  UserType {
    @Field()
    name?: string

    @Field()
    bestScore: number
}