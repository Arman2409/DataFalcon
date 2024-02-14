import { Injectable, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomLogger } from 'src/tools/logger';

@Catch() // Catches all exceptions
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger:CustomLogger

    catch(exception: any) {
        let {message} = exception;
        this.logger.error(message);
    }
}