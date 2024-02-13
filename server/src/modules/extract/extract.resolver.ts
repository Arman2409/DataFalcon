import { Injectable } from '@nestjs/common';
import { Query, Args } from "@nestjs/graphql";

import { ExtractedData } from "../../schemas/types";
import { ExtractService } from './extract.service';
@Injectable()
export class ExtractResolver {
    constructor(private readonly extractService: ExtractService) {}

    @Query(() => ExtractedData, {name: "Extract"})
    async extract(@Args('url') url: string): Promise<ExtractedData> {
        return this.extractService.extractData(url);
    }
}
