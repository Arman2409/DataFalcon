const fixProtocol = (url: string) => {
    return url.replace(/::/, ":");
}

export default fixProtocol;