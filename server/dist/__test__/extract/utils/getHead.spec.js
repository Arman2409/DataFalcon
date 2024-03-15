"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHead_1 = require("../../../src/modules/extract/mainFunctions/getHead");
const data = {
    children: [
        {
            name: "title",
            children: [
                {
                    data: "title"
                }
            ],
        }
    ]
};
describe("getHead", () => {
    it("should return title", () => {
        const { title } = (0, getHead_1.default)(data);
        expect(title).toBe("title");
    });
});
//# sourceMappingURL=getHead.spec.js.map