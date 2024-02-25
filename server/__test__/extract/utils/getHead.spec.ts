import getHead from "../../../src/modules/extract/mainFunctions/getHead";
import type { ElementModel } from "../../../types/extract";

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
}

describe("getHead", () => {
    it("should return title", () => {
       const {title} = getHead(data as ElementModel);

       expect(title).toBe("title");
    })
})