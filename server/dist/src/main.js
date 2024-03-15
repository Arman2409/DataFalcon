"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const ExceptionFilter_1 = require("./filters/ExceptionFilter");
const logger_1 = require("./tools/logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ["error", "warn", "log"]
    });
    app.enableCors();
    app.useGlobalFilters(new ExceptionFilter_1.AllExceptionsFilter(new logger_1.CustomLogger()));
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map