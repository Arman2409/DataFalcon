import { Injectable } from '@nestjs/common';
import { Query, Args } from "@nestjs/graphql";
import { GraphQLError } from 'graphql';

import { ExtractedData } from "../../schemas/types";
import { ExtractService } from './extract.service';
@Injectable()
export class ExtractResolver {
    constructor(private readonly extractService: ExtractService) {}

    @Query(() => ExtractedData || GraphQLError, {name: "Extract"})
    async extract(@Args('url') url: string): Promise<ExtractedData|GraphQLError> {
        return this.extractService.extractData(url);
    }
}
