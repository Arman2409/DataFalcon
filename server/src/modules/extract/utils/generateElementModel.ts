import uniqueID from "./uniqueID";

const getChildren = (
    children: any[],
    attribName: string,
    content: string,
    links: any[],
    images: any[]
) => {
    if (attribName === "description") {
        return [{
            type: "text",
            data: content
        }]
    }
    if (children?.length) {
        return children.flatMap((element: any) => {
            return generateElementModel(element, links, images);
        })
    }
    return [];
}

const generateElementModel = (
    element: any,
    links: any[],
    images: any[]) => {
    if (!element) return [];
    let { name, children, id, class: classname, attribs, type, data } = element;
    if (!type) return [];
    let ElementModel = {};
    if (type === 'text') {
        ElementModel = {
            id: uniqueID(name),
            type,
            data
        }
        return ElementModel;
    }
    const { name: attribName = "", rel = "", content = "", href = "" } = { ...attribs || {} }
    ElementModel = {
        id: uniqueID(name),
        name,
        classname,
        idname: id,
        type,
        children: getChildren(children, attribName, content, links, images),
    };
    if (rel || attribName) {
        ElementModel = {
            ...ElementModel,
            attribName,
            rel,
        }
    }
    if (name === "a") {
        ElementModel = {
            ...ElementModel,
            href
        }
        links.push(ElementModel);
    }
    if(name === "img") {
        // console.log(attribs);
        
    }
    return ElementModel;
}

export default generateElementModel;