import { Injectable } from '@nestjs/common';
import axios from "axios";
import { load } from "cheerio";
import { Cache } from '@nestjs/cache-manager';

import { CustomLogger } from '../../tools/logger';
import generateElementModel from './mainFunctions/generateElementModel';
import isValidUrl from "./mainFunctions/isValidUrl";
import getTitles from './mainFunctions/getTitles';
import getBaseUrl from "./mainFunctions/getBaseUrl";

@Injectable()
export class ExtractService {
    constructor(
        private readonly logger: CustomLogger,
        private readonly cache: Cache) { }

    async extractData(url: string, clearCache?: boolean) {
        try {
            const isUrlValid = isValidUrl(url);
            if (!isUrlValid) {
                throw new Error("Invalid URL");
            }
            let extractedData: any = {};
            const cachedData = await this.cache.get(url);
            let speed = 0;
            if (cachedData && clearCache) {
                await this.cache.del(url);
            } else if (cachedData) {
                return cachedData;
            }
            const startTime = Date.now();
            extractedData = (await axios.get(url))?.data;
            speed = Date.now() - startTime;
            return this.processData(extractedData, speed, url);
        } catch ({ message, response }) {
            this.logger.error(message);
            const code = { ...response };
            return {
                code,
                message
            };
        }
    }

    async processData(
        data: any,
        speed: number,
        url: string,
    ): Promise<any> {
        try {
            const baseUrl = getBaseUrl(url);
            const $ = load(data);
            const links = [];
            const images = [];
            const domModel = generateElementModel($("html")["0"], links, images, baseUrl);
            const { children: domElements = [] } = { ...domModel };
            const headModel = domElements.find(
                ({ name }: { name: string }) => name === "head"
            );
            const titles = getTitles(headModel);
            const extractedData = {
                titles,
                speed,
                links,
                images,
                domElements
            }
            await this.cache.set(url, extractedData)
            return extractedData;
        } catch ({ message, response }) {
            this.logger.error(message);
            const code = { ...response };
            return {
                code,
                message
            };
        }
    }
}
