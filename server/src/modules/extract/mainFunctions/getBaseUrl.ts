import fixProtocol from "../helpers/fixProtocol";

const getBaseUrl = (url:string):string => {
    const { protocol, hostname } = new URL(url);
    
    return fixProtocol(`${protocol}://${hostname}`);
}

export default getBaseUrl;