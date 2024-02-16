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
            const cachedData = await this.cache.get(url);
            if (cachedData) {
                extractedData = cachedData;
            }
            if (!cachedData) {
                await axios.get(url)
                    .then(({ data }) => {
                        extractedData = data
                    });
                this.cache.set(url, extractedData)
            }
            return this.processData(extractedData);
        } catch ({ message }) {
            this.logger.error(message);
            return new Error(message)
        }
    }

    async processData(data: any) {
        try {
            const $ = load(data);
            const head = $("head");
            const body = $("body");
            const headModel = generateElementModel(head["0"]);
            const header = getHeader(headModel);
            const bodyModel = generateElementModel(body["0"]);
            return ({
                header,
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
