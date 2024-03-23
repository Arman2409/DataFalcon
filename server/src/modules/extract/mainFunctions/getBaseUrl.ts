const getBaseUrl = (url:string):string => {
    const { protocol, hostname } = new URL(url);
    return `${protocol}://${hostname}`;
}

export default getBaseUrl;