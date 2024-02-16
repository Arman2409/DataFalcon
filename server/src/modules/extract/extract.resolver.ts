import { Injectable } from '@nestjs/common';
import { Query, Args, Context } from "@nestjs/graphql";
import { GraphQLError } from 'graphql';

import { ExtractedData } from "../../schemas/graphqlTypes";
import { ExtractService } from './extract.service';
@Injectable()
export class ExtractResolver {
    constructor(private readonly extractService: ExtractService) {}

    @Query(() => ExtractedData || GraphQLError, {name: "Extract"})
    async extract(@Args('url') url: string): Promise<ExtractedData|Error> {
        return this.extractService.extractData(url);
    }
}
