import { ElementModel } from "../../../../types/global";
import generateElementModel from "../../../src/modules/extract/utils/generateElementModel";

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
}

const links = [];
const images = [];
const url = "http://";

describe("generateElementModel", () => {
    it("should add link to links arr", () => {
       const { id = "" }:ElementModel = generateElementModel(element, links, images, url) as ElementModel;

       expect(links).toHaveLength(1);
       expect(typeof id).toBe("string");
    })
})