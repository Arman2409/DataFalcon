"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixProtocol = (url) => {
    return url.replace(/::/, ":");
};
exports.default = fixProtocol;
//# sourceMappingURL=fixProtocol.js.map