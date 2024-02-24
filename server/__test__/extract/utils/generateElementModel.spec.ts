import generateElementModel from "../../../src/modules/extract/utils/generateElementModel";

const element = {
    name: "a",
    type: "tag",
    href: "http://....",
    children: [
        {
            name: "title",
            type: "text",
            children: [
                {
                    data: "title"
                }
            ],
        }
    ]
}

const links = [];
const images = [];
const url = "http://";

describe("generateElementModel", () => {
    it("should add link to links arr", () => {
       const { id }:any = generateElementModel(element, links, images, url);

       expect(links).toHaveLength(1);
       expect(typeof id).toBe("string");
    })
})