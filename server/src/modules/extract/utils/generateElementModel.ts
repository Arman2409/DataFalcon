import fixProtocol from "./fixProtocol";
import uniqueID from "./uniqueID";

import type { ElementModel } from "../../../../../types/global";

const getChildren = (
    children: ElementModel[],
    attribName: string,
    content: string,
    links: ElementModel[],
    images: ElementModel[],
    url: string,
    parents: string[] = [],
) => {
    if (attribName === "description") {
        return [{
            id: uniqueID("description"),
            type: "text",
            name: "description",
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

const updateLinkModel = (
    elementModel: ElementModel,
     href: string, 
     links: ElementModel[], 
     url: string): void => {
    if (elementModel.name === "a") {
        let updatedHref = href?.startsWith("/") ? url + href : fixProtocol(href || "");
        links.push({ ...elementModel, href: updatedHref });
    }
};

const updateImageModel = (elementModel: ElementModel, images: ElementModel[], url: string): void => {
    if (elementModel.name === "img") {
        let updatedSrc = !elementModel.src?.startsWith("http") ? (elementModel.src?.startsWith("/") ? url + elementModel.src : url + "/" + elementModel.src) : fixProtocol(elementModel.src || "");
        images.push({ ...elementModel, src: updatedSrc });
    }
};

const generateElementModel = (
    element: any,
    links: ElementModel[],
    images: ElementModel[],
    url: string,
    parents: string[] = []
): ElementModel | ElementModel[] => {
    if (!element || !element.type) return [];

    const { name, children, id, class: classname, attribs, type, data } = element;
    const { name: attribName = "", rel = "", content = "", href = "", src = "", alt = "" } = { ...attribs || {} };

    if (type === 'text') {
        return ({
            id: uniqueID("text"),
            name: "text",
            type,
            data,
            parents,
        });
    }

    const uniqueId = uniqueID(name);
    const elementModel: ElementModel = {
        id: uniqueId,
        name,
        classname,
        idname: id,
        type,
        parents,
        children: getChildren(children, attribName, content, links, images, url, [...parents, uniqueId]),
    };

    if (rel || attribName) {
        elementModel.attribName = attribName;
        elementModel.rel = rel;
    }

    updateLinkModel(elementModel, href, links, url);
    updateImageModel(elementModel, images, url);

    return elementModel;
};

export default generateElementModel;