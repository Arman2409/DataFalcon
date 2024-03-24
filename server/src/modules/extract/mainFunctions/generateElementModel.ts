import uniqueID from "../helpers/uniqueID";

import type { ElementModel } from "../../../../types/extract";
import fixProtocol from "../helpers/fixProtocol";

const getChildren = (
    url: string,
    attribName: string,
    content: string,
    parents: string[] = [],
    children: ElementModel[] = [],
    links: ElementModel[],
    images: ElementModel[],
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
        return children.flatMap((element: ElementModel) => {
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
        updatedHref = fixProtocol(updatedHref);
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
        children: getChildren(url, attribName, content, [...parents, uniqueId], children,  links, images),
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