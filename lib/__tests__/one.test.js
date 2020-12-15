"use strict";
import { getSumTo2020, getMultipliedValue } from "../index";
describe("getSumTo2020", () => {
    it("gets the proper values", () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const sumInputs = getSumTo2020(input);
        expect(sumInputs).toStrictEqual([1721, 299]);
    });
});
describe("getMultipliedValue", () => {
    it("gets the proper value", () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const value = getMultipliedValue(input);
        expect(value).toBe(514579);
    });
});
