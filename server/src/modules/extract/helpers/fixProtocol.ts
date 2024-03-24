const fixProtocol = (url: string): string => {
    // Regular expression for matching double colons at the beginning of valid protocols
    const protocolRegex = /^(?:https?|ftp):+:/;
  
    // Apply the replacement, removing the last colon
    const fixedUrl = url.replace(protocolRegex, (match) => match.slice(0, -1));
  
    return fixedUrl;
  }
  
  export default fixProtocol;