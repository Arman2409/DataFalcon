import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExtractService } from './extract.service';

@Controller("extract")
export class ExtractController {
    constructor(private readonly extractService: ExtractService) {}

    @Get()
    async extractData(@Query("url") url:string) {
        return this.extractService.extractData(url);
    }
}
