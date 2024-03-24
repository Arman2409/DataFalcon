import * as configs from "../../../../configs/extract.json";

const { demoUrls } = { ...configs };

const getRandomUrl = ():string => {
    const randomIndex = Math.round(Math.random()  * demoUrls.length - 1);  
    return demoUrls[randomIndex];
}

export default getRandomUrl;