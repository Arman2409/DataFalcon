import { Field, ObjectType } from "@nestjs/graphql";
import { Cheerio, Element } from "cheerio";

@ObjectType()
export class ElementModel {
    @Field()
    name?: string

    @Field(type => [ElementModel])
    children?: ElementModel[]
}

@ObjectType()
export class ExtractedData {
    @Field()
    head?: ElementModel

    @Field()
    body?: ElementModel

    @Field()
    url?: string
}