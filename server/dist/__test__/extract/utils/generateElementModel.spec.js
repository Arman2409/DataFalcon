"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateElementModel_1 = require("../../../src/modules/extract/mainFunctions/generateElementModel");
const element = {
    id: "0",
    name: "a",
    type: "tag",
    href: "http://....",
    children: [
        {
            id: "1",
            name: "title",
            type: "text",
            children: [
                {
                    id: "1",
                    name: "text",
                    type: "text",
                    data: "title"
                }
            ],
        }
    ]
};
const links = [];
const images = [];
const url = "http://";
describe("generateElementModel", () => {
    it("should add link to links arr", () => {
        const { id = "" } = (0, generateElementModel_1.default)(element, links, images, url);
        expect(links).toHaveLength(1);
        expect(typeof id).toBe("string");
    });
});
//# sourceMappingURL=generateElementModel.spec.js.map