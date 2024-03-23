import uniqueID from "../helpers/uniqueID";

import type { ElementModel } from "../../../../types/extract";

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
        let updatedHref = href?.startsWith("/") ? url + href : href;
        updatedHref = updatedHref.replace("::", ":")
        links.push({
            ...elementModel,
            href: updatedHref
        });
    }
};

const updateImageModel = (
    elementModel: ElementModel,
    src: string,
    alt: string,
    images: ElementModel[],
    url: string): void => {
    if (elementModel.name === "img") {
        let updatedSrc = src?.startsWith("http") ? src : (src?.startsWith("/") ? url + src : url + "/" + src);
        updatedSrc = updatedSrc.replace("::", ":")
        images.push({
            ...elementModel,
            src: updatedSrc,
            alt
        });
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

    const { name, children, attribs, type, data } = element;
    const {
        name: attribName = "",
        id = "",
        class: classname = "",
        rel = "",
        content = "",
        href = "",
        src = "",
        alt = "" } = { ...attribs || {} };

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

    if (name === "a") {
        updateLinkModel(elementModel, href, links, url);
    }
    if (name === "img") {
        updateImageModel(elementModel, src, alt, images, url);
    }

    return elementModel;
};

export default generateElementModel;