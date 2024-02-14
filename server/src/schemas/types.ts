import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ExtractedData {
    @Field()
    url?: string

    @Field()
    data: string
}