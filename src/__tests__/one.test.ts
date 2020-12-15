"use strict";

import { getSumTo2020, getMultipliedValue, getTripleTo2020 } from "../one";

describe("getSumTo2020", () => {
  it("gets the proper values", () => {
    const input = [1721, 979, 366, 299, 675, 1456];
    const sumInputs = getSumTo2020(input);
    expect(sumInputs).toContain(1721);
    expect(sumInputs).toContain(299);
  });
});

describe("getTripleTo2020", () => {
  it("gets the proper values", () => {
    const input = [1721, 979, 366, 299, 675, 1456];
    const sumInputs = getTripleTo2020(input);
    expect(sumInputs).toContain(979);
    expect(sumInputs).toContain(366);
    expect(sumInputs).toContain(675);
  });
});

describe("getMultipliedValue", () => {
  it("gets the proper value for 2", () => {
    const input = [1721, 979, 366, 299, 675, 1456];
    const value = getMultipliedValue(input, 2);
    expect(value).toBe(514579);
  });

  it("gets the proper value for 3", () => {
    const input = [1721, 979, 366, 299, 675, 1456];
    const value = getMultipliedValue(input, 3);
    expect(value).toBe(241861950);
  });
});
