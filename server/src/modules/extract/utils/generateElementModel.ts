import uniqueID from "./uniqueID";

const getChildren = (
    children: any[],
    attribName: string,
    content: string,
) => {
    if (attribName === "description") {
        return [{
            type: "text",
            data: content
        }]
    }
    if (children.length) {
        return children.flatMap((element: any) => {
            return generateElementModel(element);
        })
    }
    return [];
}

const generateElementModel = (element: any) => {
    if(!element) return [];
    let { name, children, id, class: classname, attribs, type, data } = element;
    if (!type) return [];
    let DOMModel = {};
    if (type === 'text') {
        DOMModel = {
            id: uniqueID(name),
            type,
            data
        }
        return DOMModel;
    }
    const { name: attribName = "", rel = "", content = "" } = { ...attribs || {} }
    DOMModel = {
        id: uniqueID(name),
        name,
        classname,
        idname: id,
        type,
        children: getChildren(children, attribName, content),
    };
    if (rel || attribName) {
        DOMModel = {
            ...DOMModel,
            attribName,
            rel,
        }
    }
    return DOMModel;
}

export default generateElementModel;