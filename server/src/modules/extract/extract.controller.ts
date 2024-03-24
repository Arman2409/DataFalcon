import { Controller, Get, Query } from '@nestjs/common';

import { ExtractService } from './extract.service';
import getRandomUrl from './mainFunctions/getRandomUrl';

@Controller("extract")
export class ExtractController {
    constructor(private readonly extractService: ExtractService) { }

    @Get()
    async extractData(
        @Query("url") url: string,
        @Query("clearCache") clearCache: string,
        @Query("isDemo") isDemo: string) {
        if (isDemo) {
            url = getRandomUrl();
        }
        return this.extractService.extractData(url, clearCache === "true");
    }
}
