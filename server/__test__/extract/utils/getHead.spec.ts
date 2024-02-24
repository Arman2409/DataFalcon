import getHead from "../../../src/modules/extract/utils/getHead";

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
       const {title} = getHead(data);

       expect(title).toBe("title");
    })
})