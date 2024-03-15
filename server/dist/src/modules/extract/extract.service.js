"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const cache_manager_1 = require("@nestjs/cache-manager");
const logger_1 = require("../../tools/logger");
const generateElementModel_1 = require("./mainFunctions/generateElementModel");
const getHead_1 = require("./mainFunctions/getHead");
const isValidUrl_1 = require("./mainFunctions/isValidUrl");
let ExtractService = class ExtractService {
    constructor(logger, cache) {
        this.logger = logger;
        this.cache = cache;
    }
    async extractData(url) {
        try {
            const isUrlValid = (0, isValidUrl_1.default)(url);
            if (!isUrlValid) {
                throw new Error("Invalid URL");
            }
            let extractedData = {};
            const cachedUrl = await this.cache.get(url);
            let speed = 0;
            const { protocol, hostname } = new URL(url);
            const baseUrl = `${protocol}://${hostname}`;
            if (cachedUrl) {
                const { extractedData: cachedData = {}, speed: cachedSpeed = 0 } = cachedUrl;
                speed = cachedSpeed;
                extractedData = cachedData;
                return this.processData(extractedData, speed, baseUrl);
            }
            const startTime = Date.now();
            await axios_1.default.get(url)
                .then(({ data }) => {
                extractedData = data;
            });
            speed = Date.now() - startTime;
            this.cache.set(url, {
                extractedData,
                speed
            });
            return this.processData(extractedData, speed, baseUrl);
        }
        catch ({ message, response }) {
            this.logger.error(message);
            const code = { ...response };
            return {
                code,
                message
            };
        }
    }
    async processData(data, speed, url) {
        try {
            const $ = (0, cheerio_1.load)(data);
            const head = $("head");
            const body = $("body");
            const links = [];
            const images = [];
            const headModel = (0, generateElementModel_1.default)(head["0"], links, images, url);
            const bodyModel = (0, generateElementModel_1.default)(body["0"], links, images, url);
            const header = (0, getHead_1.default)(headModel);
            return ({
                head: header,
                speed,
                links,
                images,
                model: {
                    head: headModel,
                    body: bodyModel,
                }
            });
        }
        catch ({ message, response }) {
            this.logger.error(message);
            const code = { ...response };
            return {
                code,
                message
            };
        }
    }
};
exports.ExtractService = ExtractService;
exports.ExtractService = ExtractService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.CustomLogger,
        cache_manager_1.Cache])
], ExtractService);
//# sourceMappingURL=extract.service.js.map