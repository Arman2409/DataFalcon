import { Injectable } from '@nestjs/common';
import axios from "axios";
import { load } from "cheerio";
import { Cache } from '@nestjs/cache-manager';

import { CustomLogger } from '../../tools/logger';
import generateElementModel from './utils/generateElementModel';
import getHeader from './utils/getHeader';

@Injectable()
export class ExtractService {
    constructor(
        private readonly logger: CustomLogger,
        private readonly cache: Cache) { }

    async extractData(url: string) {
        try {
            let extractedData: any = {};
            const cachedUrl = await this.cache.get(url);
            let speed = 0;
            if (cachedUrl) {
                const { extractedData: cachedData = {}, speed: cachedSpeed = 0 }: any = cachedUrl;
                speed = cachedSpeed;
                extractedData = cachedData;
                return this.processData(extractedData, speed);
            }
            const startTime = Date.now();
            await axios.get(url)
                .then(({ data }) => {
                    extractedData = data
                });
            const endTime = Date.now();
            speed = endTime - startTime;

            this.cache.set(url, {
                extractedData,
                speed
            })
            return this.processData(extractedData, speed);
        } catch ({ message }) {
            this.logger.error(message);
            return new Error(message)
        }
    }

    async processData(data: any, speed: number) {
        try {
            const $ = load(data);
            const head = $("head");
            const body = $("body");
            const headModel = generateElementModel(head["0"]);
            const header = getHeader(headModel);
            const bodyModel = generateElementModel(body["0"]);
            return ({
                header,
                speed,
                model: {
                    head: headModel,
                    body: bodyModel,
                }
            })
        } catch ({ message }) {
            this.logger.error(message);
            return new Error(message);
        }
    }
}
