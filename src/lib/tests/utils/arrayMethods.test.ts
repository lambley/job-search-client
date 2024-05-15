import { repeatElements } from "../../utils/arrayMethods";

describe("repeatElements utility function", () => {
  it("should repeat the element specified number of times", () => {
    const element = "test";
    const times = 3;
    const repeatedArray = repeatElements(element, times);
    expect(repeatedArray).toEqual([element, element, element]);
  });

  it("should return an empty array when times is 0", () => {
    const element = "test";
    const times = 0;
    const repeatedArray = repeatElements(element, times);
    expect(repeatedArray).toEqual([]);
  });

  it("should return an empty array when element is null or undefined", () => {
    const times = 3;
    const repeatedArrayNull = repeatElements(null, times);
    const repeatedArrayUndefined = repeatElements(undefined, times);
    expect(repeatedArrayNull).toEqual([]);
    expect(repeatedArrayUndefined).toEqual([]);
  });

  it("should return an array of undefined elements when element is not provided", () => {
    const times = 3;
    const repeatedArray = repeatElements(undefined, times);
    expect(repeatedArray).toEqual([undefined, undefined, undefined]);
  });

  it("should return an empty array when times is negative", () => {
    const element = "test";
    const times = -3;
    const repeatedArray = repeatElements(element, times);
    expect(repeatedArray).toEqual([]);
  });
});
