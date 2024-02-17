const uniqueID = (name:string) =>  name + Math.random().toString(32).slice(2)
    
export default uniqueID;