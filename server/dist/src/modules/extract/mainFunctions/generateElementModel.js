"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueID_1 = require("../helpers/uniqueID");
const getChildren = (children, attribName, content, links, images, url, parents = []) => {
    if (attribName === "description") {
        return [{
                id: (0, uniqueID_1.default)("description"),
                type: "text",
                name: "description",
                data: content
            }];
    }
    if (children?.length) {
        return children.flatMap((element) => {
            return generateElementModel(element, links, images, url, parents);
        });
    }
    return [];
};
const updateLinkModel = (elementModel, href, links, url) => {
    if (elementModel.name === "a") {
        let updatedHref = href?.startsWith("/") ? url + href : href;
        updatedHref = updatedHref.replace("::", ":");
        links.push({
            ...elementModel,
            href: updatedHref
        });
    }
};
const updateImageModel = (elementModel, src, alt, images, url) => {
    if (elementModel.name === "img") {
        let updatedSrc = src?.startsWith("http") ? src : (src?.startsWith("/") ? url + src : url + "/" + src);
        updatedSrc = updatedSrc.replace("::", ":");
        images.push({
            ...elementModel,
            src: updatedSrc,
            alt
        });
    }
};
const generateElementModel = (element, links, images, url, parents = []) => {
    if (!element || !element.type)
        return [];
    const { name, children, id, class: classname, attribs, type, data } = element;
    const { name: attribName = "", rel = "", content = "", href = "", src = "", alt = "" } = { ...attribs || {} };
    if (type === 'text') {
        return ({
            id: (0, uniqueID_1.default)("text"),
            name: "text",
            type,
            data,
            parents,
        });
    }
    const uniqueId = (0, uniqueID_1.default)(name);
    const elementModel = {
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
exports.default = generateElementModel;
//# sourceMappingURL=generateElementModel.js.map