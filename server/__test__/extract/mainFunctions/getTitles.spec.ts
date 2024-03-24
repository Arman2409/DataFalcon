import getTitles from "../../../src/modules/extract/mainFunctions/getTitles";
import type { ElementModel } from "../../../types/extract";

const data = {
    children: [
        {
            name: "title",
            children: [{ data: "title" }],
        }
    ]
}

describe("getTitles", () => {

    it("should return the titles", () => {
        const { title } = getTitles(data as ElementModel);

        expect(title).toBe("title");
    })
})