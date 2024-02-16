const getHeader = (headModel:any) => {
    let title = "";
    let description = "";
    let iconLink = "";
    headModel.children.forEach(({name, attribName, rel, children}:any) => {
        if(name === "title") {
           title = children[0] ? children[0].data : ""; 
           return;
        }
        if(name === "meta" && attribName === "description") {
            description = children[0] ? children[0].data : ""; 
            return;
        }
        if(name === "link" && rel === "icon") {
            description = rel; 
            return;
        }
    });
    return {
        title,
        description,
        iconLink
    }
}

export default getHeader;