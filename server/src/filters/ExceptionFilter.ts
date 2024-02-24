import { Injectable, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomLogger } from 'src/tools/logger';

@Catch() // Catches all exceptions
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: CustomLogger) {}

    catch(exception: Error) {
        let {message} = exception;
        this.logger.error(message);
    }
}