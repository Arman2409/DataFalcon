import { Cache } from '@nestjs/cache-manager';
import { CustomLogger } from '../../tools/logger';
export declare class ExtractService {
    private readonly logger;
    private readonly cache;
    constructor(logger: CustomLogger, cache: Cache);
    extractData(url: string): Promise<any>;
    processData(data: any, speed: number, url: string): Promise<any>;
}
