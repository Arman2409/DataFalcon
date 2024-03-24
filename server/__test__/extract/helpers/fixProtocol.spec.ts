import fixProtocol from "../../../src/modules/extract/helpers/fixProtocol";

const invalidUrl = "https:://website";

describe("fixProtocol", () => {
    it("should return fixed url", () => {
      const fixedUrl = fixProtocol(invalidUrl);

       expect(fixedUrl.startsWith("https://")).toBeTruthy();
    })
})