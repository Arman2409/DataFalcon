import getBaseUrl from "../../../src/modules/extract/mainFunctions/getBaseUrl";

const url = "https://website/page?param=value#anchor";

describe("getBaseUrl", () => {

    it("should return the base url", () => {
       const baseUrl = getBaseUrl(url);

       expect(baseUrl).toBe("https://website");
    })
})