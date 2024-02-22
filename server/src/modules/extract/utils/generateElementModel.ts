import uniqueID from "./uniqueID";

const getChildren = (
    children: any[],
    attribName: string,
    content: string,
    links: any[],
    images: any[],
    url: string,
    parents: string[] = [],
) => {
    if (attribName === "description") {
        return [{
            type: "text",
            data: content
        }]
    }
    if (children?.length) {
        return children.flatMap((element: any) => {
            return generateElementModel(element, links, images, url, parents);
        })
    }
    return [];
}

const generateElementModel = (
    element: any,
    links: any[],
    images: any[],
    url: string, 
    parents: string[] = []) => {
    if (!element) return [];
    let { name, children, id, class: classname, attribs, type, data } = element;
    if (!type) return [];
    let ElementModel = {};
    if (type === 'text') {
        ElementModel = {
            id: uniqueID("text"),
            type,
            data,
            parents,
        }
        return ElementModel;
    }
    const { name: attribName = "", rel = "", content = "" } = { ...attribs || {} }
    const uniqueId = uniqueID(name)
    ElementModel = {
        id: uniqueId,
        name,
        classname,
        idname: id,
        type,
        parents,
        children: getChildren(children, attribName, content, links, images, url, [...parents, uniqueId]),
    };
    if (rel || attribName) {
        ElementModel = {
            ...ElementModel,
            attribName,
            rel,
        }
    }
    if (name === "a") {
        let { href = "" } = { ...attribs };
        if (href.startsWith("/")) {    
            href = url + href;
        }

        ElementModel = {
            ...ElementModel,
            href
        }
        links.push(ElementModel);
    }
    if (name === "img") {
        let { src = "" } = { ...attribs };
        if (!src.startsWith("http")) {
            // If the image src is not a full URL, we need to make it one by app
            if (src.startsWith("/")) {
                src = url + src;
                return;
            }
            src = url + "/" + src;
        }
        ElementModel = {
            ...ElementModel,
            src
        }
    }
    return ElementModel;
}

export default generateElementModel;