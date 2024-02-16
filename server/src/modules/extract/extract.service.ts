import { Injectable } from '@nestjs/common';
import axios from "axios";
import { load } from "cheerio";
import { GraphQLError } from 'graphql';
import { Cache } from '@nestjs/cache-manager';

import { CustomLogger } from '../../tools/logger';
import generateElementModel from './utils/generateElementModel';

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
            }
            const $ = load(extractedData);
            const head = $("head");
            const body = $("body");
            const headModel = generateElementModel(head["0"]);
            const bodyModel = generateElementModel(body["0"]);
            this.cache.set(url, extractedData)
            return ({
                head: headModel,
                body: bodyModel,
                url
            })
        } catch ({ message }) {
            this.logger.error(message);
            return new GraphQLError(message)
        }
    }
}
