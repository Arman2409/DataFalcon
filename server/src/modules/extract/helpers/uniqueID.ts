const uniqueID = (name: string):string => {
    return name + Math.random().toString(32).slice(2);
}

export default uniqueID;