import { ExceptionFilter } from '@nestjs/common';
import { CustomLogger } from 'src/tools/logger';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: CustomLogger);
    catch(exception: Error): void;
}
