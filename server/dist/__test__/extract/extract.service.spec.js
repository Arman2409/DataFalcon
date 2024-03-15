"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cache_manager_1 = require("@nestjs/cache-manager");
const extract_service_1 = require("../../src/modules/extract/extract.service");
const logger_1 = require("../../src/tools/logger");
const testURL = "https://httpbin.org/html";
describe('ExtractService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [extract_service_1.ExtractService, logger_1.CustomLogger],
            imports: [
                cache_manager_1.CacheModule.register({
                    ttl: 5 * 60 * 1000,
                    max: 100,
                }),
            ],
        }).compile();
        service = module.get(extract_service_1.ExtractService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should throw error if URL not defined', async () => {
        const { message = "" } = await service.extractData("");
        expect(message).toBe("Invalid URL");
    });
    it('should extract data', async () => {
        const { head, model, speed, links } = await service.extractData(testURL);
        expect(typeof speed).toBe("number");
        expect(links).toBeInstanceOf(Array);
        expect(model).toBeInstanceOf(Object);
        expect(head).toBeInstanceOf(Object);
    });
});
//# sourceMappingURL=extract.service.spec.js.map