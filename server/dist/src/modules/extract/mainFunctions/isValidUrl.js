"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.default = isValidUrl;
//# sourceMappingURL=isValidUrl.js.map