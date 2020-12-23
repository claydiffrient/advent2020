import {
  calculateTotalWidth,
  convertMap,
  countTrees,
  findProductOfCounts,
  widenMap,
  findLargestSlope,
} from "../three";

const sampleInput = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

describe("convertMap", () => {
  it("returns the proper map", () => {
    expect(convertMap(sampleInput)).toEqual([
      [
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      [
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        true,
        false,
        false,
      ],
      [
        false,
        true,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
      ],
      [false, false, true, false, true, false, false, false, true, false, true],
      [false, true, false, false, false, true, true, false, false, true, false],
      [
        false,
        false,
        true,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
      ],
      [false, true, false, true, false, true, false, false, false, false, true],
      [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
      ],
      [true, false, true, true, false, false, false, true, false, false, false],
      [true, false, false, false, true, true, false, false, false, false, true],
      [false, true, false, false, true, false, false, false, true, false, true],
    ]);
  });
});

describe("calculateTotalWidth", () => {
  it("returns the total width number", () => {
    const skiMap = convertMap(sampleInput);
    expect(calculateTotalWidth(skiMap, 3, 1)).toEqual(33);
  });
});

describe("widenMap", () => {
  it("returns the widened map", () => {
    const skiMap = convertMap(sampleInput);
    const neededWidth = calculateTotalWidth(skiMap, 3, 1);
    const actual = widenMap(skiMap, neededWidth);
    expect(actual[0].length).toEqual(33);
  });
});

describe("countTrees", () => {
  it("returns the proper count", () => {
    let right = 3;
    let down = 1;
    const skiMap = convertMap(sampleInput);
    const neededWidth = calculateTotalWidth(skiMap, right, down);
    const widened = widenMap(skiMap, neededWidth);
    expect(countTrees(widened, down, right)).toBe(7);
  });
});

describe("productOfCounts", () => {
  it("returns the proper product", () => {
    const slopes: [number, number][] = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ];
    const [right, down] = findLargestSlope(slopes);
    const skiMap = convertMap(sampleInput);
    const neededWidth = calculateTotalWidth(skiMap, right, down);
    const widened = widenMap(skiMap, neededWidth);
    expect(findProductOfCounts(widened, slopes)).toBe(336);
  });
});
