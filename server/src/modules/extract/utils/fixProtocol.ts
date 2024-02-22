const fixProtocol = (url: string) => {
    if (url.startsWith("http:://")) {
        return url.replace("http:://", "http://");
    }
    if (url.startsWith("https:://")) {
        return url.replace("https:://", "https://");
    }
    return url;
}

export default fixProtocol;