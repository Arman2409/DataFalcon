import { ExtractService } from './extract.service';
export declare class ExtractController {
    private readonly extractService;
    constructor(extractService: ExtractService);
    extractData(url: string): Promise<any>;
}
