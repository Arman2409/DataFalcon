"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixProtocol_1 = require("../../../src/modules/extract/helpers/fixProtocol");
const inValidUrl = "https:://website";
describe("fixProtocol", () => {
    it("should return fixed url", () => {
        const fixedUrl = (0, fixProtocol_1.default)(inValidUrl);
        expect(fixedUrl.startsWith("https://")).toBeTruthy();
    });
});
//# sourceMappingURL=fixProtocol.spec.js.map