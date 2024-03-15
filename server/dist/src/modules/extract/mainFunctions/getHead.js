"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHead = ({ children }) => {
    let title = "";
    let description = "";
    let iconLink = "";
    children.forEach(({ name, attribName, rel, children }) => {
        if (name === "title") {
            title = children[0] ? children[0].data : "";
            return;
        }
        if (name === "meta" && attribName === "description") {
            description = children[0] ? children[0].data : "";
            return;
        }
        if (name === "link" && rel === "icon") {
            description = rel;
            return;
        }
    });
    return {
        title,
        description,
        iconLink
    };
};
exports.default = getHead;
//# sourceMappingURL=getHead.js.map