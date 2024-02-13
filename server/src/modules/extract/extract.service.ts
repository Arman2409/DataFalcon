import { Injectable } from '@nestjs/common';
import axios from "axios";
import { load } from "cheerio";

@Injectable()
export class ExtractService {
    async extractData(url: string) {
        const data = await axios.get(url)
        .then((res)=>{
            return res.data;
        }).catch((err)=>{
            
        })
        const $ = load(data);
        return ({
            data: "",
            url
        })
    }
}
