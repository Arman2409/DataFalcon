import { Injectable } from '@nestjs/common';
import axios from "axios";
import { load } from "cheerio";
import { Cache } from '@nestjs/cache-manager';

import { CustomLogger } from '../../tools/logger';
import generateElementModel from './utils/generateElementModel';
import getHead from './utils/getHead';
import isValidUrl from "./utils/isValidUrl";
import type { ElementModel } from '../../../../types/global';

@Injectable()
export class ExtractService {
    constructor(
        private readonly logger: CustomLogger,
        private readonly cache: Cache) {}

    async extractData(url: string) {
        try {
            const isUrlValid = isValidUrl(url);
            if(!isUrlValid) {
                throw new Error("Invalid URL");
            }
            let extractedData: any = {};
            const cachedUrl = await this.cache.get(url);
            let speed = 0;
            const {protocol, hostname} = new URL(url);
            const baseUrl = `${protocol}://${hostname}`;  
            if (cachedUrl) {
                const { extractedData: cachedData = {}, speed: cachedSpeed = 0 }: any = cachedUrl;
                speed = cachedSpeed;
                extractedData = cachedData;
                return this.processData(extractedData, speed, baseUrl);
            }     
            const startTime = Date.now();
            await axios.get(url)
                .then(({ data }) => {                 
                    extractedData = data;
                });
            const endTime = Date.now();
            speed = endTime - startTime;
            this.cache.set(url, {
                extractedData,
                speed
            })
            return this.processData(extractedData, speed, baseUrl);
        } catch ({ message, response }) {
            this.logger.error(message);
            const code = { ...response };
            return {
                code,
                message
            };
        }
    }

    async processData(data: any, speed: number, url:string):Promise<any> {
        try {
            const $ = load(data);
            const head = $("head");
            const body = $("body");
            const links = [];
            const images = [];
            const headModel = generateElementModel(head["0"], links, images, url);
            const bodyModel = generateElementModel(body["0"], links, images, url);
            const header = getHead(headModel as ElementModel);                        
            return ({
                head: header,
                speed,
                links,
                images,
                model: {
                    head: headModel,
                    body: bodyModel,
                }
            })
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
