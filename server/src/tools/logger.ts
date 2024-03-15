import { Injectable, Logger } from '@nestjs/common';
import { appendFileSync } from "fs";

@Injectable()
export class CustomLogger {
    private readonly logger = new Logger();

    error(message: string) {
        this.logger.error(message);
        // appendFileSync('./logs/errors.log', `${new Date().toISOString()} - ${message} \n`);
    }
}