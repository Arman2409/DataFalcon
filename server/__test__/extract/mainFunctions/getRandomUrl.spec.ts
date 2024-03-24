import getRandomUrl from "../../../src/modules/extract/mainFunctions/getRandomUrl";

describe("getRandomUrl", () => {
    
    it("should return random url", () => {
       const randomUrl = getRandomUrl();

       expect(randomUrl.startsWith("https://")).toBeTruthy();
    })
})