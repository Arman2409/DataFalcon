import { Controller, Get, Query } from '@nestjs/common';

import { ExtractService } from './extract.service';

@Controller("extract")
export class ExtractController {
    constructor(private readonly extractService: ExtractService) { }

    @Get()
    async extractData(
        @Query("url") url: string,
        @Query("clearCache") clearCache: string) {
        return this.extractService.extractData(url, clearCache === "true");
    }
}
