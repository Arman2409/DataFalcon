import fixProtocol from "../../../src/modules/extract/utils/fixProtocol";

const inValidUrl = "https:://website";

describe("fixProtocol", () => {
    it("should return fixed url", () => {
      const fixedUrl = fixProtocol(inValidUrl);

       expect(fixedUrl.startsWith("https://")).toBeTruthy();
    })
})