const sliceString = (str: string, length: number, dots = true) => {
    // return the string itself if it doesn't exceed the given size
    if (str.length < length) return str;
    return str.slice(0, length) + (dots ? "..." : "");
  };
  
  export default sliceString;