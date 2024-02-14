import { Injectable } from '@nestjs/common';
import axios from "axios";
import { load } from "cheerio";
import { GraphQLError } from 'graphql';

import { CustomLogger } from '../../tools/logger';

@Injectable()
export class ExtractService {
   constructor(private readonly logger:CustomLogger){} 

    async extractData(url: string) {
        try {
            return await axios.get(url)
                .then(({ data }) => {
                    const $ = load(data);
                    return ({
                        data: "",
                        url
                    })
                })
        } catch ({ message }) {
            this.logger.error(message);
            return new GraphQLError(message)
        }
    }
}
